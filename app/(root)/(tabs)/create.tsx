import ContinueButton from '@/components/ContinueButton';
import Header from '@/components/Header';
import RoundedButton from '@/components/RoundedButton';
import { textSize } from '@/constants/data';
import { getImageUri, setImageFilename, setImageUri } from '@/store/FormDataStore';
import * as ImagePicker from 'expo-image-picker';
import { router, useFocusEffect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view'
import IconButton from '@/components/IconButton';
import { uploadFiles } from '@/utils/tus';
import { useAuth } from '@/provider/AuthProvider';

export default function CreateScreen() {
  const { user } = useAuth()
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Request media library permissions when the component mounts
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, [user]);

  useFocusEffect(() => {
    if(getImageUri()) {
      setSelectedImage(getImageUri())
    }
  })

  // Image Picker
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7, // Reduce quality to keep file size manageable for API
      base64: false, // We'll handle base64 conversion in the backend for security/efficiency
    });

    if (!result.canceled) {
      try {
        setIsUploading(true)
        const filename = result.assets[0].uri.split('/').pop();
        setImageFilename(filename!)
        await uploadFiles('uploads', result, user!.id, filename!)
      } catch (err) {
        console.log(err)
        alert('Upload failed! ;-;')
      } finally {
        setIsUploading(false)
      }
      setImageUri(result.assets[0].uri)
      setSelectedImage(getImageUri());   
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <SafeAreaView className='flex-col mx-5'>
        <Header text='Create Screen' size='text-xl'/>
        
        {/* Body */}
        <View className='pt-5'>
          {/* Title */}
          {/* <Text className='font-rubik-semibold text-black text-xl'> Add a Photo</Text> */}
          
          {/* Middle Card */}
          <View 
            className="flex flex-col items-center justify-center w-full h-4/5 mt-3 bg-slate-50 border-dotted" 
            style={[{borderWidth: 2, borderColor: '#8C8E983a', borderRadius: 10, boxShadow: '5 5 4 0 rgba(0, 0, 0, 0.1)'}]}
          >
            {/* Displays image if selected, otherwise displays prompt text */}
            {selectedImage ? 
              <View className='h-3/4 w-full pt-2'>
                <ReactNativeZoomableView
                  minZoom={1}
                  maxZoom={30}
                >
                  <Image source={{uri: selectedImage}} className={'w-full h-full rounded-lg'} resizeMode='contain'/>
                </ReactNativeZoomableView>
              </View>
              :
              <View className='flex flex-col items-center justify-center'>
                {/* Temp uploading activity indicator */}
                { isUploading ? 
                <ActivityIndicator animating size={'large'} color={'#0000ee'}/>
                :
                <View></View>
                }
                <Text className='font-rubik-semibold text-black text-lg'>Start Redesigning</Text>
                <Text className='font-rubik text-black text-lg'>Redesign and accentuate your home</Text> 
              </View>
            }

            <View className='flex-row items-center justify-evenly w-full'>
              {/* Add Photo Button */}
              <RoundedButton onPress={() => pickImageAsync()} buttonImage={"image-multiple"} title='Add Photo' textSize={textSize.xl}/>
              
              {/* Take Photo Button */}
              <IconButton onPress={() => {router.push(`/feature-screens/CameraScreen`)}} buttonImage={"camera"} buttonSize={24}/>
            </View>
          </View>
        </View>

        {/* Bottom */}
        <View className="absolute bottom-20 items-center w-full">
          <ContinueButton text='CONTINUE' disabled={selectedImage !== undefined ? false : true} onPress={() => {router.push(`/create-screens/RoomSelectionScreen`)}}/>
        </View>
    </SafeAreaView>
  );
}
