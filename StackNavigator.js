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
import FeedScreen from './screens/FeedScreen';
import LoginPage from './screens/LoginPage';
import FriendsScreen from './screens/FriendsScreen';
import PostScreen from './screens/PostScreen';

const Tab = createBottomTabNavigator();

function BottomTabs () {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    tabBarLabel:"Feed",
                    headerShown:false,
                    tabBarLabelStyle: { color: "black" },
                    tabBarIcon: ({focused}) =>
                    focused ? (
                        <Entypo name="home" size={24} color="black" />
                    ) : (
                        <AntDesign name="home" size={24} color="black" />
                    )
                }}

            />  

            <Tab.Screen
                name="Post"
                component={PostScreen}
                options={{
                    tabBarLabel:"Post",
                    headerShown:false,
                    tabBarLabelStyle: { color: "black" },
                    tabBarIcon: ({focused}) => 
                        focused ? (
                            <MaterialCommunityIcons name="music-box-multiple" size={24} color="black" />
                        ) : (
                            <MaterialCommunityIcons name="music-box-multiple-outline" size={24} color="black" />
                        )
                }}
            /> 

            <Tab.Screen
                name="Friends"
                component={FriendsScreen}
                options={{
                    tabBarLabel:"Friends",
                    headerShown:false,
                    tabBarLabelStyle: { color: "black" },
                    tabBarIcon:({focused}) =>
                        focused ? (
                            <Ionicons name="person-add" size={24} color="black" />
                        ) : (
                            <Ionicons name="person-add-outline" size={24} color="black" />
                        )
                }}
            />



            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel:"Profile",
                    headerShown:false,
                    tabBarLabelStyle: { color: "black" },
                    tabBarIcon:({focused}) =>
                        focused ? (
                            <Ionicons name="person-circle" size={28} color="black" />
                        ) : (
                            <Ionicons name="person-circle-outline" size={28} color="black" />
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