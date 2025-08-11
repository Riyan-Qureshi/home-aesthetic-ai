import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '@/components/Header';
import ContinueButton from '@/components/ContinueButton';
import { RESPONSIVE_SCREEN_HEIGHT, RESPONSIVE_SCREEN_WIDTH, STYLE_DATA } from '@/constants/data';
import ImageButton from '@/components/ImageButton';
import { getAesthetic, setAesthetic } from '@/store/FormDataStore';

const AestheticSelectionScreen = () => {
  const [selectedAesthetic, setSelectedAesthetic] = useState<string>();
  const [isStyleSelected, setIsStyleSelected] = useState<boolean>(false);

  return (
    <SafeAreaView className='mx-5' style={{flex: 1}}>
        <View>
            <Header text='Select Aesthetic' size='text-xl'/>
            <Text className='font-rubik my-2 text-lg'>Select your desired aesthetic to create your ideal interior design</Text>
        </View>
        <FlatList
            showsVerticalScrollIndicator={false}
            data={[0]} //Must provide data but there is no data needed so I place single item array to invoke render item
            renderItem={() => (                
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={STYLE_DATA}
                    renderItem={ ({item}) => (
                        <ImageButton
                            image={item.image} 
                            title={item.name}
                            buttonPress={() => {
                                setAesthetic(item.name)
                                setSelectedAesthetic(getAesthetic())
                                setIsStyleSelected(true)
                            }}
                            isDisabled={item.name !== selectedAesthetic}
                        />
                        )
                    } 
                    numColumns={3} 
                    horizontal={false}
                    columnWrapperClassName='justify-evenly'
                    className='pb-2'
                />
            )}
        />
        <View className='py-2 border-t-2 border-gray-300 -mx-5'>
            <View className='mx-5'>
                <ContinueButton 
                    text='CONTINUE' 
                    disabled={isStyleSelected ? false : true} 
                    onPress={() => {router.push(`/create-screens/GeneratedImageScreen`)}}
                />
            </View>
        </View>
    </SafeAreaView>
  )
}

export default AestheticSelectionScreen