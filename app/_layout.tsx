import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import './global.css'
import {useFonts} from "expo-font"
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/provider/AuthProvider";

// Makes sure the user is authenticated before accessing protected pages
const InitialLayout = () => {
  const { session, initialized } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (!initialized) return

    // Check if the path/url is in the (root) group
    const inAuthGroup = segments[0] === '(root)'

    if (session && !inAuthGroup) {
      // Redirect authenticated users to the home page
      router.replace('/')
    } else if (!session) {
      // Redirect unauthenticated users to the AuthVerifyScreen page
      router.replace('/AuthVerifyScreen')
    }
  }, [session, initialized])

  return <Slot />
}

export default function RootLayout() {
  const fontsLoaded = useFonts({
    "Rubik-Bold": require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-ExtraBold": require('../assets/fonts/Rubik-ExtraBold.ttf'),
    "Rubik-Light": require('../assets/fonts/Rubik-Light.ttf'),
    "Rubik-Medium": require('../assets/fonts/Rubik-Medium.ttf'),
    "Rubik-Regular": require('../assets/fonts/Rubik-Regular.ttf'),
    "Rubik-SemiBold": require('../assets/fonts/Rubik-SemiBold.ttf'),
  });

  useEffect(() => {
    // If fonts have loaded hide splash screen
    if(fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded) return null;
  
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  )
}
