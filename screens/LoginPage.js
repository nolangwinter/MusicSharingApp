import { StyleSheet, Text, View, SafeAreaView, Pressable, Alert} from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as AppAuth from 'expo-app-auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const LoginPage = () => {
    const navigation = useNavigation();
    //checks if the token from spotify is still valid and will keep the user signed in
    // useEffect(() => {
    //     const checkTokenValidity = async () => {
    //       const accessToken = await AsyncStorage.getItem("token");
    //       const expirationDate = await AsyncStorage.getItem("expirationDate");
    
    //       if(accessToken && expirationDate){
    //         const currentTime = Date.now();
    //         if(currentTime < parseInt(expirationDate)){
    //           // here the token is still valid
    //           navigation.replace("Main");
    //         } else {
    //           // token would be expired so we need to remove it from the async storage
    //           AsyncStorage.removeItem("token");
    //           AsyncStorage.removeItem("expirationDate");
    //         }
    //       }
    //     }
    
    //     checkTokenValidity();
    //   },[])

    // fetches the user profile and returns a json 
    const getProfile = async () => {
        const accessToken = await AsyncStorage.getItem("token");
        try {
          const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          return data;
        } catch (err) {
          console.log(err.message);
        }
      };

      // gets permission from the user to link their spotify account and information 
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
          // loop back on android
          redirectUrl:"exp://localhost:8081/--/spotify-auth-callback"
        }
        try {
            const result = await AppAuth.authAsync(config);
            if(result.accessToken){
              const expirationDate = new Date(result.accessTokenExpirationDate).getTime(); 
    
              // locally store the access token and the expiration date 
              AsyncStorage.setItem("token",result.accessToken);
              AsyncStorage.setItem("expirationDate",expirationDate.toString());
              
            }
        } catch(err) {
            console.log(err.message);
        }
      }


      const handleLogin = async () => {
        await authenticate();
        const newUser = await getProfile();
        // console.log(newUser);
        const user = {
            username:newUser.display_name,
            email:newUser.email,
            profilePic:newUser.images[0].url
        }
        // console.log(user);

        // // this communicates with app.post (express) within index.js and passes it the user that is logging/ registering
        axios.post('http://localhost:3000/login', user).then((response) => {
            // console.log(response);
            const token = response.data.token;
            // adding the token to asyncstorage
            AsyncStorage.setItem("authToken", token);

            navigation.navigate("Main");
        }).catch((error) => {
            Alert.alert("Login Failed", "An error occured during login");
            console.log("error", error);
        })
      }

  return (
    <SafeAreaView>
      <View style={{height:80}}/>

      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          Music Sharing App
        </Text>
      </View>

      <View style={{height:"60%"}}/>

      <Pressable style={styles.spotifySignIn} onPress={() => handleLogin()} >
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