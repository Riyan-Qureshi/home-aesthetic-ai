import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
    text: string,
    onPress: any,
    disabled: boolean,
}

export default function ContinueButton({ text, onPress, disabled } : Props) {
  return (
    <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className={`flex items-center justify-center relative w-full mt-3 p-5 ${disabled ? 'bg-slate-100' : 'bg-white'}`}
        style={{  
            borderWidth: 2,
            borderColor: '#8C8E983a',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, 
        }}
    >
      <Text className={`font-rubik-semibold text-xl ${disabled ? 'text-gray-400' : 'text-black'}`}>{text}</Text>
    </TouchableOpacity>
  )
}