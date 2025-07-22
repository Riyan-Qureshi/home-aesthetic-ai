import Header from '@/components/Header';
import { getAesthetic, getImageUri, getRoomType } from '@/store/FormDataStore';
import { API_ANDROID_HOST, API_HOST, API_PORT } from '@env';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native'
import animations from '@/constants/animations'
import { useFocusEffect } from 'expo-router';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { RESPONSIVE_SCREEN_WIDTH } from '@/constants/data';


const host = Platform.OS === 'android' ? API_ANDROID_HOST : API_HOST
const port = API_PORT
const BACKEND_URL = `http://${host}:${port}`

const GeneratedImageScreen = () => {
  // const {selectedImage, selectedRoom, selectedAesthetic} = useLocalSearchParams<{selectedImage: string, selectedRoom: string, selectedAesthetic: string}>()
  const selectedImage = getImageUri()
  const selectedRoom = getRoomType()
  const selectedAesthetic = getAesthetic()

  // States for Gemini API interaction
  const [prompt, setPrompt] = useState<string>(`Can you apply a ${selectedAesthetic} aesthetic to the interior design of this ${selectedRoom} image while maintaining furniture layout?`);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to send prompt and/or image to the backend for Gemini API call
  const generateImage = async () => {
    // Validate input: require at least a prompt or an image
    if (!prompt.trim() && !selectedImage) {
      setError('Please enter a prompt or select an image to generate.');
      setGeneratedImageUrl(undefined);
      return;
    }

    setLoading(true);
    setGeneratedImageUrl(undefined); // Clear previous generated image
    setError(null); // Clear previous errors

    const formData = new FormData();
    if (prompt.trim()) {
      formData.append('prompt', prompt);
    }

    if (selectedImage) {
      // Prepare image for FormData. Axios handles 'multipart/form-data' well with URI.
      const filename = selectedImage.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';

      formData.append('image', {
        uri: selectedImage,
        name: filename,
        type: type,
      } as any);
  }

  try {
    // Make the API call to your backend
    const response = await fetch(
      `${BACKEND_URL}/generate-image`, 
      {
        method: "POST",
        body: formData
      }
    );
    const data = await response.json()

    // Check if image data is present in the response
    if (response.ok) {
      setGeneratedImageUrl(`data:image/jpeg;base64,${data.image}`)
    } else if (data.textResponse) {
      // Handle cases where Gemini might return only text
      setError(`Model returned text: "${data.textResponse}". No image was generated.`);
    } else {
      setError('Unexpected response from the server. No image data received.');
    }

  } catch (err: any) {
    // console.error('Error during image generation:', err.message);

    // Display more specific error if available from backend
    console.error('Failed to generate image. ' + (err.response?.data?.details || err.message || 'Please try again.'));
  } finally {
    setLoading(false);
  }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     generateImage()
  //   }, [])
  // ) 

  const animation = useRef<LottieView>(null); //Prevents re-rendering on change
  return (
    <SafeAreaView className='mx-5'>
      {loading && (
        <View className='w-full h-full items-center'>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 400,
              height: 400,
              backgroundColor: '',
            }}
            source={animations.paperplaneLoading}
          />
          <Text className='font-rubik text-2xl text-black'>Reimagining Your Room</Text>
        </View>
      )}
      {!loading && (
      <View className='items-center w-full h-full'>
      <Header text='Generate Screen' size='text-xl'/>
      
      {/* Middle Card */}
      <View 
        className="flex flex-col h-1/2 items-center justify-center mt-3 bg-slate-50 border-dotted" 
        style={{borderWidth: 2, borderColor: '#8C8E983a', borderRadius: 10, boxShadow: '5 5 4 0 rgba(0, 0, 0, 0.2)', width: RESPONSIVE_SCREEN_WIDTH}}
      >
        {loading && (
        <View className="flex-row items-center justify-center">
            <ActivityIndicator size="large" color="#0000ff" className="mr-3" />
            <Text className="font-rubik text-gray-600 text-lg">Generating your image</Text>
        </View>
        )}

        {error && (
        <Text className="font-rubik text-red-600 text-center mt-4 text-base">{error}</Text>
        )}

        {/* Generated Image */}
        {generatedImageUrl && !loading && (
          <ReactNativeZoomableView
            minZoom={1}
            maxZoom={30}
            style={{width: RESPONSIVE_SCREEN_WIDTH, height:'100%'}}
          >
            <Image source={{uri: generatedImageUrl}} className={'w-full h-full rounded-lg'} resizeMode='cover'/>
          </ReactNativeZoomableView>
        )}

        {/* Generated Image Placeholder Text */}
        {!generatedImageUrl && !loading && !error && (
        <Text className="font-rubik text-gray-500 text-base">
            Your generated image will appear here.
        </Text>
        )}
      </View>

      {/* Generate Redesign Button */}
      <TouchableOpacity
          onPress={generateImage}
          disabled={loading} // Disable while loading
          className={`mt-auto p-8 rounded-full items-center ${loading ? 'bg-gray-400' : 'bg-black'}`}
      >
          {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
          <Text className='font-rubik-semibold text-white text-xl'>Generate Redesign</Text>
          )}
      </TouchableOpacity>
      </View>
      )}
    </SafeAreaView>
  )
}

export default GeneratedImageScreen