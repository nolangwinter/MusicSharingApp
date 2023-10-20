import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation()


const logout = () => {
  clearAuthToken();
}
const clearAuthToken = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("expirationDate");
  console.log("Cleared asyncStorage");
  navigation.replace("Login")
}

  return (
    <SafeAreaView>
      <Pressable
        onPress={logout}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          borderColor: "#D0D0D0",
          borderWidth: 1,
          borderRadius: 5,
        }}
      >
        <Text style={{fontSize:18, color:"black", textAlign:"center"}}>Logout</Text>
    </Pressable>
  </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})