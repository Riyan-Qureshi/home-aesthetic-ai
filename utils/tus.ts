import { EXPO_PUBLIC_SUPABASE_PROJECT_STORAGE_URL } from '@env';
import * as ImagePicker from 'expo-image-picker';
import { fetch } from 'expo/fetch';
import { Upload } from 'tus-js-client';
import { supabase } from './supabase';

function getFileExtension(uri: string): string {
const match = /\.([a-zA-Z]+)$/.exec(uri);
if (match !== null) {
    return match[1];
}

return '';
}

function getMimeType(extension: string): string {
if (extension === 'jpg') return 'image/jpeg';
return `image/${extension}`;
}

export async function uploadFiles( bucketName: string, pickerResult: ImagePicker.ImagePickerResult, userID: string, filename: string) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Not signed in')
  const accessToken = session.access_token
const allUploads = pickerResult.assets.map(
    (
    file: ImagePicker.ImagePickerAsset
    ) => {
    return new Promise<void>(async (resolve, reject) => {
        const extension = getFileExtension(file.uri);
        // const blob = await fetch(file.uri).then((res) => res.blob());
        const resp = await fetch(file.uri)
        const reader = resp.body?.getReader()

        if(!reader) {
            throw new Error('Failed to read file')
        }

        const upload = new Upload(reader, {
        uploadLengthDeferred: true,
        endpoint: `${EXPO_PUBLIC_SUPABASE_PROJECT_STORAGE_URL}/storage/v1/upload/resumable`,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        headers: {
            authorization: `Bearer ${accessToken}`, // or replace with logged in user's access token.
            'x-upsert': 'true', // optionally set upsert to true to overwrite existing files, requires RLS update policy.
        },
        uploadDataDuringCreation: true,
        removeFingerprintOnSuccess: true, // Important if you want to allow re-uploading the same file https://github.com/tus/tus-js-client/blob/main/docs/api.md#removefingerprintonsuccess
        metadata: {
            bucketName: bucketName,
            // @ts-ignore TODO: check why types are acting up here.
            objectName: `${userID}/${filename}`,
            contentType: getMimeType(extension),
            cacheControl: '3600',
        },
        chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
        onError: function (error) {
            console.log('Failed because: ' + error);
            reject(error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
            const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(bytesUploaded, bytesTotal, percentage + '%');
        },
        onSuccess: function () {
            console.log('Uploaded %s', upload.options.metadata?.objectName);
            resolve();
        },
        });

        // Check if there are any previous uploads to continue.
        return upload.findPreviousUploads().then(function (previousUploads) {
        // Found previous uploads so we select the first one.
        if (previousUploads.length) {
            upload.resumeFromPreviousUpload(previousUploads[0]);
        }

        // Start the upload
        upload.start();
        });
    });
    }
);
await Promise.allSettled(allUploads);
return;
}