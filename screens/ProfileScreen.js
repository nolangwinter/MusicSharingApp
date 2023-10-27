import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { UserType } from '../UserContext';
import axios from 'axios';

const ProfileScreen = () => {
  const [user, setUser] = useState("");
  const navigation = useNavigation()
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProfile();
  });

const logout = () => {
  clearAuthToken();
}
const clearAuthToken = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("expirationDate");
  await AsyncStorage.removeItem("authToken");
  console.log("Cleared asyncStorage");
  navigation.replace("Login")
}

  return (
    <SafeAreaView>
      <Pressable
        onPress={logout}
        style={{
          backgroundColor:"blue",
          height:60,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          borderColor: "#D0D0D0",
          borderWidth: 1,
          borderRadius: 5,
        }}
      >
        <Text style={{fontSize:18, color:"white", textAlign:"center"}}>Logout</Text>
    </Pressable>
    <Image source={{ uri:user?.profilePic}} style={styles.profilePic}/>
    <Text style={styles.displayName} >{user?.username}</Text>
    <Text style={styles.email} >{user?.email}</Text>
  </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profilePic: {
    width:60,
    height:60,
    borderRadius:30,
    resizeMode:"cover",
    marginTop:15,
  },
  displayName: {
    color:"black",
    fontSize:19,
    fontWeight:"bold",
  },
  email: {
    color:"gray",
    fontSize:17,
    fontWeight:"bold",
  },
})