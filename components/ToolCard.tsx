import { buttonShadowStyle } from "@/constants/data";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
    title: string, 
    description: string,
    image: any, 
    buttonPress: any
}

export default function ToolCard ({title, description, image, buttonPress}: Props) { 
    return ( 
        <TouchableOpacity 
            className="flex flex-col justify-center relative w-full mt-3 bg-slate-50" 
            style={buttonShadowStyle}
            onPress={buttonPress}
        >
            {/* Temporary Image Placeholder */}
            <View className="flex bg-white h-64" style={{borderRadius: 10}}/>

            <View className="flex px-5">
                <Text className="font-rubik-bold text-xl mt-2">{title}</Text>
                <Text className="font-rubik text-lg mt-1 mb-2">{description}</Text>
            </View>
        </TouchableOpacity>
    )
}