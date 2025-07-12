import ContinueButton from '@/components/ContinueButton';
import Header from '@/components/Header';
import RoundedButton from '@/components/RoundedButton';
import icons from '@/constants/icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_ANDROID_HOST, API_HOST, API_PORT } from '@env';

const host = Platform.OS === 'android' ? API_ANDROID_HOST : API_HOST
const port = API_PORT
const BACKEND_URL = `http://${host}:${port}`

console.log('Backend URL: ', BACKEND_URL)

export default function CreateScreen() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  // States for Gemini API interaction
  // const [prompt, setPrompt] = useState<string>('Can you apply a Cyberpunk home aesthetic to this image?');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Request media library permissions when the component mounts
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  // Image Picker
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.7, // Reduce quality to keep file size manageable for API
      base64: false, // We'll handle base64 conversion in the backend for security/efficiency
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };

  // TODO: Delete Later once Generated Image Screen is confirmed to work
  // Function to send prompt and/or image to the backend for Gemini API call
  // const generateImage = async () => {
  //   // Validate input: require at least a prompt or an image
  //   if (!prompt.trim() && !selectedImage) {
  //     setError('Please enter a prompt or select an image to generate.');
  //     setGeneratedImageUrl(undefined);
  //     return;
  //   }

  //   setLoading(true);
  //   setGeneratedImageUrl(undefined); // Clear previous generated image
  //   setError(null); // Clear previous errors

  //   const formData = new FormData();
  //   if (prompt.trim()) {
  //     formData.append('prompt', prompt);
  //   }

  //   if (selectedImage) {
  //     // Prepare image for FormData. Axios handles 'multipart/form-data' well with URI.
  //     const filename = selectedImage.split('/').pop();
  //     const match = /\.(\w+)$/.exec(filename);
  //     const type = match ? `image/${match[1]}` : 'image';

  //     formData.append('image', {
  //       uri: selectedImage,
  //       name: filename,
  //       type: type,
  //     });
  //   }

  //   try {
  //     // Make the API call to your backend
  //     const response = await axios.post(`${BACKEND_URL}/generate-image`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data', // Important for sending files
  //       },
  //     });
  //     // const response = await axios.get(`${BACKEND_URL}/generate-image`)

  //     // console.log(response.data.text)

  //     // Check if image data is present in the response
  //     if (response.data.image) {
  //       setGeneratedImageUrl(`data:image/jpeg;base64,${response.data.image}`)
  //     } else if (response.data.textResponse) {
  //       // Handle cases where Gemini might return only text
  //       setError(`Model returned text: "${response.data.textResponse}". No image was generated.`);
  //     } else {
  //       setError('Unexpected response from the server. No image data received.');
  //     }

  //   } catch (err: any) {
  //     console.error('Error during image generation:', err);
  //     // Display more specific error if available from backend
  //     setError('Failed to generate image. ' + (err.response?.data?.details || err.message || 'Please try again.'));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <SafeAreaView className='flex flex-col h-screen-safe'>
      <ScrollView className='mx-5'>
        <Header text='Create Screen' size='text-xl'/>
        
        {/* Body */}
        <View className='pt-5'>
          {/* Title */}
          <Text className='font-rubik-semibold text-black text-xl'> Add a Photo</Text>
          
          {/* Middle Card */}
          <View 
            className="flex flex-col items-center justify-center w-full h-96 mt-3 bg-slate-50 border-dotted" 
            style={{borderWidth: 2, borderColor: '#8C8E983a', borderRadius: 10, boxShadow: '5 5 4 0 rgba(0, 0, 0, 0.2)'}}
          >
            {/* Displays image if selected, otherwise displays prompt text */}
            {selectedImage ? 
              <View className='flex pt-2'>
                <Image source={{uri: selectedImage}} className={'w-96 h-64 rounded-lg'}/>
              </View>
              :
              <View className='flex flex-col items-center justify-center'>
                <Text className='font-rubik-semibold text-black text-lg'>Start Redesigning</Text>
                <Text className='font-rubik text-black text-lg'>Redesign and accentuate your home</Text>
              </View>
            }

            {/* Add Photo Button */}
            <RoundedButton onPress={() => pickImageAsync()} buttonImage={icons.send} title='Add Photo'/>
          </View>
        </View>

        {/* Bottom */}
        <View className="items-center">
          
          {/* Generated Image Display Section */}
          <View className="flex pt-8 mx-5 items-center">
            <Text className="font-rubik-semibold text-black text-xl mb-4">Generated Redesign:</Text>
            {loading && (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator size="large" color="#0000ff" className="mr-3" />
                <Text className="font-rubik text-gray-600 text-lg">Generating your image...</Text>
              </View>
            )}

            {error && (
              <Text className="font-rubik text-red-600 text-center mt-4 text-base">{error}</Text>
            )}

            {generatedImageUrl && !loading && (
              <Image 
                source={{uri: generatedImageUrl}} 
                className={'w-96 h-96 rounded-lg'}
              />
            )}

            {!generatedImageUrl && !loading && !error && (
              <Text className="font-rubik text-gray-500 text-base">
                Your generated image will appear here.
              </Text>
            )}
          </View>

          <ContinueButton text='Continue' disabled={selectedImage ? false : true} onPress={() => {router.push('/(root)/create-screens/RoomSelectionScreen')}}/>
        </View>
        

      </ScrollView>
    </SafeAreaView>
  );
}
