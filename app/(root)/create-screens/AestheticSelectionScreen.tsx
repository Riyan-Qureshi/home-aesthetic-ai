import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '@/components/Header';
import ContinueButton from '@/components/ContinueButton';
import { STYLE_DATA } from '@/constants/data';
import ImageButton from '@/components/ImageButton';
import { getAesthetic, setAesthetic } from '@/store/FormDataStore';

const AestheticSelectionScreen = () => {
  const [selectedAesthetic, setSelectedAesthetic] = useState<string>();
  const [isStyleSelected, setIsStyleSelected] = useState<boolean>(false);

  return (
    <SafeAreaView className='mx-5'>
        <View className=''>
            <Header text='Select Aesthetic' size='text-xl'/>
            <Text className='font-rubik my-2 text-lg'>Select your desired aesthetic to create your ideal interior design</Text>
        </View>
        <FlatList 
            data={[0]} //Must provide data but there is no data needed so I place single item array to invoke render item
            renderItem={() => (                
                <FlatList
                    data={STYLE_DATA}
                    renderItem={ ({item}) => (
                        <ImageButton 
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
        <View className=''>
            <ContinueButton 
                text='Continue' 
                disabled={isStyleSelected ? false : true} 
                onPress={() => {router.push(`/create-screens/GeneratedImageScreen`)}}
            />
        </View>
    </SafeAreaView>
  )
}

export default AestheticSelectionScreen