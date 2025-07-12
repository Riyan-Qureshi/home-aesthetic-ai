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