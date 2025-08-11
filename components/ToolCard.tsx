import { buttonShadowStyle } from "@/constants/data";
import { Image, Text, TouchableOpacity, View } from "react-native";
import BeforeAfterSlider from "./BeforeAfterSlider";

type Props = {
    title: string, 
    description: string,
    staticImage?: any,
    beforeImage?: any,
    afterImage?: any, 
    buttonPress: any
}

export default function ToolCard ({title, description, staticImage, beforeImage, afterImage, buttonPress}: Props) { 
    return ( 
        <TouchableOpacity 
            className="flex flex-col items-center justify-center relative mt-3 bg-slate-50" 
            style={[buttonShadowStyle]}
            onPress={buttonPress}
        >
            {staticImage ? 
            <Image source={staticImage} className="h-64 w-full" style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}} resizeMode="cover"/>
            :
            <BeforeAfterSlider afterImage={afterImage} beforeImage={beforeImage}/>
            }
            
            <View className="flex px-5">
                <Text className="font-rubik-bold text-xl mt-2">{title}</Text>
                <Text className="font-rubik text-lg mt-1 mb-2">{description}</Text>
            </View>
        </TouchableOpacity>
    )
}