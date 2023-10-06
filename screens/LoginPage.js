import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppAuth from 'expo-app-auth'

const LoginPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      const expirationDate = await AsyncStorage.getItem("expirationDate");
      console.log("acess token",accessToken);
      console.log("expiration date",expirationDate);

      if(accessToken && expirationDate){
        const currentTime = Date.now();
        if(currentTime < parseInt(expirationDate)){
          // here the token is still valid
          navigation.replace("Main");
        } else {
          // token would be expired so we need to remove it from the async storage
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("expirationDate");
        }
      }
    }

    checkTokenValidity();
  },[])
  async function authenticate ()  {
    const config = {
      issuer:"https://accounts.spotify.com",
      clientId:"fd58139e33ac46d38a68c93bdfda2988",
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public" // or "playlist-modify-private"
      ],
      redirectUrl:"exp://localhost:8081/--/spotify-auth-callback"
    }
    const result = await AppAuth.authAsync(config);
    console.log(result);
    if(result.accessToken){
      const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
      AsyncStorage.setItem("token",result.accessToken);
      AsyncStorage.setItem("expirationDate",expirationDate.toString());
      navigation.navigate("Main")
    }
  }

  return (
    <SafeAreaView>
      <View style={{height:80}}/>

      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          Music Sharing App
        </Text>
      </View>

      <View style={{height:80}}/>

      <Pressable style={styles.spotifySignIn} onPress={authenticate}>
        <Entypo style={styles.spotifyLogo} name="spotify" size={30}/>
        <Text style={styles.spSignInText}>
          Sign In With Spotify
        </Text>
      </Pressable>

    </SafeAreaView>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  titleText: {
    fontSize: 40,
    fontWeight:"bold",
    color:"#1DB954",
  },
  titleView: {
    alignItems:"center",
    padding:15,
    justifyContent:"center"
  },
  spotifySignIn: {
    backgroundColor: "#1DB954",
    padding:10,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical:10,
    width: 300,
    height:60,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection:"row"
  },
  spSignInText: {
    fontSize: 20,
    padding: 5,
    fontWeight: 500,
  }
})