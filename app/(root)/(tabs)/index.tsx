import { Text, View, StatusBar, TouchableOpacity, Image, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import icons from '@/constants/icons';
import ToolCard from '@/components/ToolCard';
import { FEATURED_DATA } from '@/constants/data';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  const handleFeatureCardPress = () => router.navigate(`/create`);

  return (
    <LinearGradient
    colors={['#ebf4f5', '#b5c6e0']}
    start={{x: 0, y: 0}}
    end={{x: 1, y : 1}}
    className='flex-1'
    >
      <SafeAreaView className='h-full'>

        <StatusBar barStyle="dark-content" />
        <View className="flex flex-row items-center justify-between mt-2 mx-5 pb-2">
            {/* Filler Item */}
            <TouchableOpacity
              className="flex rounded-full size-12"
            />

            {/* Title */}
            <Text className="font-rubik-medium text-2xl text-black">Home Aesthetic AI</Text>

            {/* Settings Button */}
            <Pressable
              onPress={() => router.navigate('/profile')}
              className="flex flex-row rounded-full size-12 items-center justify-center"
            >
                <Image source={icons.filter} className="size-8" />
            </Pressable>
        </View>
        <FlatList
          data={FEATURED_DATA}
          contentContainerClassName='px-5 pb-24 items-center'
          renderItem={({item}) => <ToolCard title={item.title} description={item.description} buttonPress={() => handleFeatureCardPress()} beforeImage={item.beforeImage} afterImage={item.afterImage}/>}
          keyExtractor={(item) => item.title}
          bounces={false}
        />
        
      </SafeAreaView> 
    </LinearGradient>
  );
}
