import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContinueButton from '@/components/ContinueButton';
import Header from '@/components/Header';

const RoomSelectionScreen = () => {
    const {selectedImage, title, areaID} = useLocalSearchParams<{selectedImage?: string, title?: string, areaID?: string}>();
    const [selectedRoom, setSelectedRoom] = useState<string>();
    const [isRoomSelected, setIsRoomSelected] = useState<boolean>(false);

    return (
        <SafeAreaView className='mx-5'>
            <ScrollView>
                <Header text='Choose Room Type' size='text-xl'/>

                {/* <FlatList /> */}

                <ContinueButton 
                    text='Continue' 
                    disabled={isRoomSelected ? false : true} 
                    onPress={() => {router.push('/(root)/create-screens/GeneratedImageScreen')}}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default RoomSelectionScreen