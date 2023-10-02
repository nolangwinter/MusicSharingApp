import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';

const LoginPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={{height:80}}/>

      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          Music Sharing App
        </Text>
      </View>

      <View style={{height:80}}/>

      <Pressable style={styles.spotifySignIn} onPress={() => {navigation.navigate("Main")}}>
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