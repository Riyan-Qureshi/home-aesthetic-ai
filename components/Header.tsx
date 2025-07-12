import { View, Text, TouchableOpacity, Pressable, Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { router } from 'expo-router'

interface Props {
    text: string,
    size: string,
}

export default function Header({ text, size } : Props) {
  return (
    <View className='flex flex-row items-center justify-between mt-2 border-b-black border-b-2 pb-2 w-full'>
        {/* Filler Item */}
        <TouchableOpacity
        className="flex rounded-full size-12"
        />

        {/* Title */}
        <Text className={`font-rubik-semibold text-black ${size}`}>{text}</Text>

        {/* Back Button */}
        <Pressable
        onPress={() => router.back()}
        className="flex flex-row rounded-full size-12 items-center justify-center"
        >
            <Image source={icons.x} className="size-8" />
        </Pressable>
    </View>
  )
}