import { textSize } from '@/constants/data'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

interface Props {
    onPress: any,
    buttonImage: any,
    title?: string,
    textSize?: textSize,
    isDisabled?: boolean
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

export default function RoundedButton({onPress, buttonImage, title, textSize, isDisabled} : Props) {
  return (
    <TouchableOpacity
        onPress={onPress}
        className="flex pt-2"
    >
        <View className={`flex-row p-4 w-40 rounded-full items-center ${isDisabled ? 'bg-slate-100' : 'bg-black'}`}>
            <Text className={`font-rubik-semibold ${textSize} pr-2 m-auto ${isDisabled ? 'text-gray-400' : 'text-white'}`}>{renderContent(title)}</Text>
            <View className='bg-white p-1 rounded-full ml-auto'>
                <Image source={buttonImage} className='size-5' tintColor={`${isDisabled? '#9ca3af' : '#000000'}`}/>
            </View>
        </View>
    </TouchableOpacity>
  )
}