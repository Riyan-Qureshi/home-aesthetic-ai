import { View, Text, ScrollView, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContinueButton from '@/components/ContinueButton';
import Header from '@/components/Header';
import RoundedButton from '@/components/RoundedButton';
import { ROOM_DATA, textSize } from '@/constants/data';

const RoomSelectionScreen = () => {
    const {selectedImage} = useLocalSearchParams<{selectedImage?: string,}>();
    const [selectedRoom, setSelectedRoom] = useState<string>();
    const [isRoomSelected, setIsRoomSelected] = useState<boolean>(false);

    return (
        <SafeAreaView className='mx-5'>
            <FlatList 
                data={[0]} //Must provide data but there is no data needed so I place single item array to invoke render item
                ListHeaderComponent={
                    <View className=''>
                        <Header text='Choose Room Type' size='text-xl'/>
                        <Text className='font-rubik-medium text-lg'>Choose Room</Text>
                        <Text className='font-rubik mb-2'>Select a room to design and see it transformed in your chosen style</Text>
                    </View>
                }
                ListFooterComponent={
                    <ContinueButton 
                        text='Continue' 
                        disabled={isRoomSelected ? false : true} 
                        onPress={() => {router.push(`/create-screens/GeneratedImageScreen?selectedImage=${selectedImage}&selectedRoom=${selectedRoom}`)}}
                    />
                }
                renderItem={() => (                
                    <FlatList
                        data={ROOM_DATA}
                        renderItem={ ({item}) => (
                                <RoundedButton 
                                    buttonImage={item.icon} 
                                    textSize={textSize.small} 
                                    title={item.name} 
                                    onPress={() => {
                                        setSelectedRoom(item.name)
                                        setIsRoomSelected(true)
                                    }} 
                                    isDisabled={item.name !== selectedRoom}
                                />
                            )
                        } 
                        numColumns={2} 
                        horizontal={false}
                        columnWrapperClassName='justify-evenly'
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default RoomSelectionScreen