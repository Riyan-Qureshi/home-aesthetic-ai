import { buttonShadowStyle } from "@/constants/data";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
    title: string, 
    image?: any, 
    buttonPress: any,
    isDisabled: boolean
}

export default function ImageButton ({title, image, buttonPress, isDisabled}: Props) { 
    return ( 
        <TouchableOpacity 
            className={`flex flex-col justify-center relative mt-3 ${isDisabled ? 'bg-slate-50' : 'bg-black-300'} w-32`}
            style={buttonShadowStyle}
            onPress={buttonPress}
        >
            <Image source={image} className="h-28 w-full" style={{borderRadius: 10}} resizeMode="cover"/>

            <View className="flex items-center">
                <Text className={`font-rubik text-md my-2 ${isDisabled ? 'text-black' : 'text-white'}`}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}