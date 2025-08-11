import Entypo from '@expo/vector-icons/Entypo'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

interface Props {
    onPress: any,
    buttonImage: any,
    isDisabled?: boolean,
    buttonSize?: number,
}

export default function IconButton({onPress, buttonImage, isDisabled, buttonSize} : Props) {
  return (
    <TouchableOpacity
        onPress={onPress}
        className="flex pt-2"
    >
        <View className={`flex-row p-4 rounded-full items-center ${isDisabled ? 'bg-slate-100' : 'bg-black'}`}>
            <View className='bg-white p-2 rounded-full items-center justify-center'>
                <Entypo name={buttonImage} size={!buttonSize ? 24 : buttonSize} color="black" />
            </View>
        </View>
    </TouchableOpacity>
  )
}