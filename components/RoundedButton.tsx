import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

interface Props {
    onPress: any,
    buttonImage: any,
    title?: string,
    textSize?: textSize
}

export enum textSize {
    small = 'text-sm',
    medium = 'text-md',
    large = 'text-lg',
    xl = 'text-xl'
}

const renderContent = (title : string | undefined) => {
    if (title) {
        try {
            if (title.length < 20) {
                return title
            }
            throw new Error("InvalidTitleLength: The provided title's length is greater than 20 characters")
        } catch (error) {
            console.log(`Error: ${error}`)
            return "Some Error Occured"
        }
    } 

    return "Missing Title"
}

export default function RoundedButton({onPress, buttonImage, title, textSize} : Props) {
  return (
    <TouchableOpacity
        onPress={onPress}
        className="flex pt-2"
    >
        <View className='flex-row bg-black p-4 rounded-full items-center justify-evenly'>
            <Text className={`font-rubik-semibold text-white ${textSize} pr-2`}>{renderContent(title)}</Text>
            <View className='bg-white p-1 rounded-full'>
                <Image source={buttonImage} className='size-5'/>
            </View>
        </View>
    </TouchableOpacity>
  )
}