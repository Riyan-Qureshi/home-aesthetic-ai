import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { buttonShadowStyle } from '@/constants/data';

interface Props {
    text: string,
    onPress: any,
    disabled: boolean,
    style?: any
}

export default function ContinueButton({ text, onPress, disabled, style } : Props) {
  return (
    <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className='w-full'
        // className={`flex items-center justify-center relative w-full mt-3 p-5 ${disabled ? 'bg-slate-100' : 'bg-white'} ${style}`}
        // style={[buttonShadowStyle]}
    >
      <LinearGradient
      colors={!disabled ? ['#57ebde', '#aefb2a'] : ['#ebf4f5', '#9ca3af']}
      start={{x: 0, y: 0}}
      end={{x: 1, y : 1}}
      style={[buttonShadowStyle, {width: '100%', marginTop: 12, padding: 15, alignItems: 'center', borderRadius: 30}]}
      >
        <Text className={`font-rubik-semibold text-lg ${disabled ? 'text-gray-400' : 'text-black'}`}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}