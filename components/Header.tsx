import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';

interface Props {
    text: string,
    size: string,
}

export default function Header({ text, size } : Props) {
  return (
    <View className='flex flex-row items-center justify-between mt-2 pb-2 w-full'>

        {/* Back Button */}
        <Pressable
        onPress={() => router.back()}
        className="flex flex-row rounded-full size-12 items-center justify-center bg-white"
        >
            <AntDesign name="arrowleft" size={32} color="black" />
        </Pressable>

        {/* Title */}
        <Text className={`font-rubik-semibold text-black ${size}`}>{text}</Text>

        {/* Filler Item */}
        <TouchableOpacity
        className="flex rounded-full size-12"
        />
    </View>
  )
}