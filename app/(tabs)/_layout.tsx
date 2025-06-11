import { View, Text, Image, ImageSourcePropType } from 'react-native'
import { Tabs } from 'expo-router';
import icons from '@/constants/icons'

const TabIcon = ({focused, icon, title}: {focused: boolean, icon: ImageSourcePropType, title: string}) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
        <Image
            source={icon}
            tintColor={focused ? "#000000" : "#666876"}
            resizeMode="contain"
            className="size-6"
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
                backgroundColor: 'white',
                position: 'absolute',
                borderTopColor: '#0061FF1A',
                borderTopWidth: 1,
                minHeight: 70,
                display: 'flex'
            }
        }}
    >
        <Tabs.Screen 
            name='index'
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon icon={icons.home} focused={focused} title={'Tools'}/>
                )
            }}
        />
            <Tabs.Screen 
                name='about'
                options={{
                    title: 'About',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon icon={icons.edit} focused={focused} title={'Create'}/>
                    )
                }}
            />
            <Tabs.Screen 
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon icon={icons.person} focused={focused} title={'Profile'}/>
                    )
                }}
            />
    </Tabs>
  );
}