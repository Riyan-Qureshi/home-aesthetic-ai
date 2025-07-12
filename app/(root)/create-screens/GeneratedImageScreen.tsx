import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';

const GeneratedImageScreen = () => {
    const {selectedImage} = useLocalSearchParams<{selectedImage?: string}>()

    // States for Gemini API interaction
    const [prompt, setPrompt] = useState<string>('Can you apply a Cyberpunk home aesthetic to this image?');
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
      });
    }

    try {
      // Make the API call to your backend
      const response = await axios.post(`${BACKEND_URL}/generate-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for sending files
        },
      });
      // const response = await axios.get(`${BACKEND_URL}/generate-image`)

      // console.log(response.data.text)

      // Check if image data is present in the response
      if (response.data.image) {
        setGeneratedImageUrl(`data:image/jpeg;base64,${response.data.image}`)
      } else if (response.data.textResponse) {
        // Handle cases where Gemini might return only text
        setError(`Model returned text: "${response.data.textResponse}". No image was generated.`);
      } else {
        setError('Unexpected response from the server. No image data received.');
      }

    } catch (err: any) {
      console.error('Error during image generation:', err);
      // Display more specific error if available from backend
      setError('Failed to generate image. ' + (err.response?.data?.details || err.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
    };

  return (
    <SafeAreaView className='items-center mx-5'>
      <Header text='Generate Screen' size='text-xl'/>

      {/* Generate Redesign Button */}
      <TouchableOpacity
          onPress={generateImage}
          disabled={loading} // Disable while loading
          className={`mt-6 p-4 rounded-full items-center ${loading ? 'bg-gray-400' : 'bg-blue-600'}`}
      >
          {loading ? (
          <ActivityIndicator size="small" color="#fff" />
          ) : (
          <Text className='font-rubik-semibold text-white text-lg'>Generate Redesign</Text>
          )}
      </TouchableOpacity>
      
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
  </SafeAreaView>
  )
}

export default GeneratedImageScreen