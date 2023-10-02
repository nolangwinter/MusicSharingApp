import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ProfileScreen from './screens/ProfileScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import FeedScreen from './screens/FeedScreen';
import LoginPage from './screens/LoginPage';

const Tab = createBottomTabNavigator();

function BottomTabs () {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                shadowOpacity:4,
                shadowRadius:4,
                elevation:4,
                shadowOffset:{
                    width:0,
                    height:-4
                },
                borderTopWidth:0

            }
        }}>
            <Tab.Screen
                name="Discover"
                component={DiscoverScreen}
                options={{
                    tabBarLabel:"Discover",
                    headerShown:false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({focused}) => 
                        focused ? (
                            <MaterialCommunityIcons name="music-box-multiple" size={24} color="white" />
                        ) : (
                            <MaterialCommunityIcons name="music-box-multiple-outline" size={24} color="white" />
                        )
                }}
            />

            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    tabBarLabel:"Feed",
                    headerShown:false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({focused}) =>
                    focused ? (
                        <Entypo name="home" size={24} color="white" />
                    ) : (
                        <AntDesign name="home" size={24} color="white" />
                    )
                }}

            />    

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel:"Profile",
                    headerShown:false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon:({focused}) =>
                        focused ? (
                            <Ionicons name="person" size={24} color="white" />
                        ) : (
                            <Ionicons name="person-outline" size={24} color="white" />
                        )
                }}
            />

        </Tab.Navigator>
    )
}

const Stack = createStackNavigator();
const Navigation = () => {
  return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    
  )
}

export default Navigation

const styles = StyleSheet.create({})