import { Text, View, StatusBar, TouchableOpacity, Image, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import icons from '@/constants/icons';
import ToolCard from '@/components/ToolCard';

export default function Index() {
  return (
    <SafeAreaView className='bg-white h-full'>
      <StatusBar barStyle="dark-content" />
      <View className="flex flex-row items-center justify-between mt-2 mx-5 border-b-black border-b-2 pb-2">
          {/* Filler Item */}
          <TouchableOpacity
            className="flex rounded-full size-12"
          />

          {/* Title */}
          <Text className="font-rubik-medium text-3xl text-black">Home Aesthetic AI</Text>

          {/* Escape Button */}
          <Pressable
            onPress={() => router.navigate('/(tabs)/about')}
            className="flex flex-row rounded-full size-12 items-center justify-center"
          >
              <Image source={icons.filter} className="size-8" />
          </Pressable>
      </View>
      <FlatList
        data={[
          {
            title: 'Interior Design',
            description: 'Upload a pic, choose a style, let AI design the room!'
          },
          {
            title: 'Garden Design',
            description: 'Upload a pic, choose a style, let AI design the room!'
          },
          {
            title: 'Reference Style',
            description: 'Upload a pic, choose a style, let AI design the room!'
          },
        ]}
        renderItem={({item}) => <ToolCard title={item.title} description={item.description} buttonPress={() => {}} image=''/>}
        contentContainerClassName='px-5 pb-24 items-center'
        bounces={false}
      />

    </SafeAreaView>
  );
}
