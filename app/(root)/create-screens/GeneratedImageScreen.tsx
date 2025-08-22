import ContinueButton from '@/components/ContinueButton';
import Header from '@/components/Header';
import animations from '@/constants/animations';
import { RESPONSIVE_SCREEN_WIDTH } from '@/constants/data';
import { useAuth } from '@/provider/AuthProvider';
import { getAesthetic, getImageFilename, getImageUri, getRoomType } from '@/store/FormDataStore';
import { supabase } from '@/utils/supabase';
import { EXPO_PUBLIC_SUPABASE_ANON_KEY, EXPO_PUBLIC_SUPABASE_URL } from '@env';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const GeneratedImageScreen = () => {
  // const {selectedImage, selectedRoom, selectedAesthetic} = useLocalSearchParams<{selectedImage: string, selectedRoom: string, selectedAesthetic: string}>()
  const selectedImage = getImageUri()
  const selectedRoom = getRoomType()
  const selectedAesthetic = getAesthetic()
  const { user } = useAuth()

  // States for Gemini API interaction
  /** 
   * TODO: Improve prompt, this should be alot more descriptive and describe the scene better.
   * The room type and other details can possibly be inferenced from another GPT call
   * */

  const [prompt, setPrompt] = useState<string>(`Can you apply a ${selectedAesthetic} aesthetic to the interior design of this ${selectedRoom} image while maintaining furniture layout, but replacing or removing any decor that doesn't fit the aesthetic? Make sure to double check your results such that they match the requested aesthetic.`);
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

    let filename = ''

    if (selectedImage) {
      // Prepare image for FormData. Axios handles 'multipart/form-data' well with URI.
      filename = getImageFilename()!
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';

      formData.append('image', {
        uri: selectedImage,
        name: filename,
        type: type,
      } as any);
  }

  try {

    console.log('FORM DATA: \n\n', JSON.stringify(formData, null, 2))
    const { data: supabaseData, error } = await supabase.functions.invoke('generate-image', {
      body: { imagePath: filename, prompt },
    })
    console.log('SUPABASE DATA: \n\n', JSON.stringify(supabaseData, null, 2))
    console.log('SUPABASE ERROR: \n\n', JSON.stringify(error, null, 2))

    const {data: imageData, error: downloadError} = await supabase.storage.from('generated-images').download(`${user!.id}/${supabaseData.generatedImageName}`)

    if (downloadError) {
      console.log('DOWNLOAD ERROR: \n\n', JSON.stringify(downloadError, null, 2))
      setError('Failed to download image. Please try again.')
      return
    }

    function blobToBase64(blob: Blob): Promise<string> {
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string); // TODO improve
        reader.readAsDataURL(blob);
      });
    }

    const imageBlob = imageData
    console.log('IMAGE BLOBB: ', imageBlob)
    const imageBase64String: string = await blobToBase64(imageData)
    console.log('BASE 64 STRING: ', imageBase64String)
    setGeneratedImageUrl(`${imageBase64String}`)
    
  } catch (err: any) {
    // console.error('Error during image generation:', err.message);

    // Display more specific error if available from backend
    console.error('Failed to generate image. ' + (err.response?.data?.details || err.message || 'Please try again.') + '.');
    setError('Failed to generate image. ' + (err.response?.data?.details || err.message || 'Please try again.') + '.')
  } finally {
    setLoading(false);
  }
  };

  // Makes single POST request whenever user navigates to this page
  useFocusEffect(
    React.useCallback(() => {
      generateImage()
    }, [])
  ) 

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

        {/* Image Generation Error Text */}
        {error && (
        <Text className="font-rubik text-red-600 text-center mt-4 text-base">{error}</Text>
        )}

        {/* Generated Image */}
        {generatedImageUrl && !loading && (
          <ReactNativeZoomableView
            minZoom={1}
            maxZoom={30}
            style={{width: RESPONSIVE_SCREEN_WIDTH - 5, height:'100%'}}
          >
            <Image source={{uri: generatedImageUrl}} className={'w-full h-full'} style={{borderRadius: 10}}resizeMode='contain'/>
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
      {/* <TouchableOpacity
          onPress={generateImage}
          disabled={loading} // Disable while loading
          className={`mt-auto p-8 rounded-full items-center ${loading ? 'bg-gray-400' : 'bg-black'}`}
      >
          {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
          <Text className='font-rubik-semibold text-white text-xl'>Generate Redesign</Text>
          )}
      </TouchableOpacity> */}
        <ContinueButton 
        onPress={generateImage}
        disabled={loading}
        text='GENERATE REDESIGN'
        />
      </View>
      )}
    </SafeAreaView>
  )
}

export default GeneratedImageScreen