import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { setImageUri } from "@/store/FormDataStore";
import IconButton from "@/components/IconButton";

const CameraScreen = () => {
    const [image, setImage] = useState<any>(null);
    const [facing, setFacing] = useState<CameraType>("back");
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
        <SafeAreaView className="flex-1 justify-center">
            <Text className="text-center pb-10">
            We need your permission to show the camera
            </Text>
            <Button onPress={requestPermission} title="grant permission" />
        </SafeAreaView>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const data = await cameraRef.current.takePictureAsync({
                quality: 0.7,
                base64: false,
                shutterSound: false // Disable Shutter Sound
            })
                setImage(data.uri)
                setImageUri(data.uri)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <SafeAreaView className="flex-1 items-center bg-black">
            {/* Show Camera if no photo is taken, otherwise show taken photo */}
            {!image ?
            <CameraView
            style={{ width: "100%", height: "80%", borderRadius: 10 }}
            facing={facing}
            ref={cameraRef}
            >
                {/* Top Right Back Button */}
                <TouchableOpacity
                className="absolute top-0 right-0 p-4"
                onPress={() => {router.back()}}
                >
                    <Entypo name="back" size={32} color="white" />
                </TouchableOpacity>
            </CameraView>
            :
            <View className="w-full h-4/5">
                <Image source={{uri: image}} className="flex-1" resizeMode="center"/>
            </View>
        }

        {/* Bottom Screen Buttons that alternate depending on if in Camera mode, or Photo taken viewing mode */}
        {!image ? 
            <View className="flex-1 flex-row w-full justify-evenly items-center">
                <IconButton onPress={takePicture} buttonImage={"camera"} buttonSize={56}/>
                <IconButton onPress={toggleCameraFacing} buttonImage={"cycle"} buttonSize={56}/>
            </View>
            :
            <View className="flex-1 flex-col items-center w-full justify-center bg-black rounded-xl">
                    {/* Retake Photo Button */}
                    <TouchableOpacity 
                    className="flex-row items-center w-full justify-center p-4 bg-slate-700"
                    onPress={() => {setImage(null)}}
                    >
                        <Entypo name="retweet" size={24} color="white" />
                        <Text className="text-white text-2xl font-rubik-bold pl-2">Retake Photo</Text>
                    </TouchableOpacity>

                    {/* Use This Photo Button */}
                    <TouchableOpacity
                    className="flex-row p-4"
                    onPress={() => {router.back()}}
                    >
                        <Entypo name="image" size={24} color="white" />
                        <Text className="text-white text-2xl font-rubik-bold pl-2">Use This Photo</Text>
                    </TouchableOpacity>
                </View>
        }
        </SafeAreaView>
    );
};

export default CameraScreen;
