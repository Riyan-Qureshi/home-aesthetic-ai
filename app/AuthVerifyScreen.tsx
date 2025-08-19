import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'
import animations from '@/constants/animations'
import { User } from '@supabase/supabase-js'
import { ensureAnonUser } from '@/utils/supabase'

const AuthVerifyScreen = () => {
  const [user, setUser] = useState<User | null>()
  const animation = useRef<LottieView>(null); //Prevents re-rendering on change

  async function createUser () {
    try{
      const userInfo = await ensureAnonUser();
      setUser(userInfo)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    createUser()
  }, [])

  return (
    <SafeAreaView className='mx-5'>
      <View className='w-full h-full items-center'>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 400,
            height: 400,
            backgroundColor: '',
          }}
          source={animations.paperplaneLoading}
        />
        <Text className='font-rubik text-xl text-black'>Sit tight while we verify your information</Text>
      </View>
    </SafeAreaView>
  )
}

export default AuthVerifyScreen