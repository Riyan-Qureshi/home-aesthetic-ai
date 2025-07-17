import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContinueButton from '@/components/ContinueButton';
import Header from '@/components/Header';
import RoundedButton from '@/components/RoundedButton';
import { ROOM_DATA, textSize } from '@/constants/data';
import { getRoomType, setRoomType } from '@/store/FormDataStore';

const RoomSelectionScreen = () => {
    // const {selectedImage} = useLocalSearchParams<{selectedImage?: string,}>();
    const [selectedRoomType, setSelectedRoomType] = useState<string>();
    const [isRoomSelected, setIsRoomSelected] = useState<boolean>(false);

    return (
        <SafeAreaView className='mx-5'>
            <Header text='Choose Room Type' size='text-xl'/>
            <Text className='font-rubik my-2 text-lg'>Select a room to design and see it transformed in your chosen style</Text>
            <FlatList 
                data={[0]} //Must provide data but there is no data needed so I place single item array to invoke render item
                renderItem={() => (                
                    <FlatList
                        data={ROOM_DATA}
                        renderItem={ ({item}) => (
                                <RoundedButton 
                                    buttonImage={item.icon} 
                                    textSize={textSize.large} 
                                    title={item.name} 
                                    onPress={() => {
                                        setRoomType(item.name)
                                        setSelectedRoomType(getRoomType)
                                        setIsRoomSelected(true)
                                    }} 
                                    isDisabled={item.name !== selectedRoomType}
                                />
                            )
                        } 
                        numColumns={2} 
                        horizontal={false}
                        columnWrapperClassName='justify-evenly'
                        bounces={false}
                        className='pb-2'
                    />
                )}
            />
            <View className='mt-auto'>
                <ContinueButton 
                    text='Continue' 
                    disabled={isRoomSelected ? false : true} 
                    onPress={() => {router.push(`/create-screens/AestheticSelectionScreen`)}}
                />
            </View>
        </SafeAreaView>
    )
}

export default RoomSelectionScreen