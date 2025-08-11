import { View, Text, Image, ImageSourcePropType } from 'react-native'
import { Tabs } from 'expo-router';
import icons from '@/constants/icons'
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur'

const TabIcon = ({focused, icon, title, size}: {focused: boolean, icon: ImageSourcePropType, title: string, size: number}) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
        <Image
            source={icon}
            tintColor={focused ? "#000000" : "#666876"}
            resizeMode="contain"
            style={{width: size, height: size}}
        />
        <Text className={`${focused ? "text-black font-rubik-medium" : "text-black-200 font-rubik"} text-xs w-full text-center mt-1`}>
            {title}
        </Text>
    </View>
)

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                // backgroundColor: 'rgba(255, 255, 255, 0.90)',
                position: 'absolute',
                borderTopColor: 'rgba(200, 200, 200, 0.8)',
                borderTopWidth: 2,
                minHeight: 70,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            },
            tabBarBackground: () => (
                // <LinearGradient
                // colors={['#ebf4f5f0', '#b5c6e0']}
                // start={{x: 0.5, y: 0}}
                // end={{x: 0.5, y : 1}}
                // style={StyleSheet.absoluteFill}
                // />
                <BlurView
                tint="systemChromeMaterialLight"
                intensity={60}
                style={StyleSheet.absoluteFill}
                experimentalBlurMethod='dimezisBlurView'
                />
            )
        }}
    >
        <Tabs.Screen 
            name='index'
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon icon={icons.home} focused={focused} title={'Home'} size={24}/>
                )
            }}
        />
            <Tabs.Screen 
                name='create'
                options={{
                    title: 'Create',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon icon={icons.edit} focused={focused} title={'Create'} size={32} />
                    )
                }}
            />
            <Tabs.Screen 
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon icon={icons.person} focused={focused} title={'Profile'} size={24}/>
                    )
                }}
            />
    </Tabs>
  );
}