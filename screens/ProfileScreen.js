import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { UserType } from '../UserContext';
import axios from 'axios';
import RecentlyPlayed from '../components/RecentlyPlayed';

const ProfileScreen = () => {
  const [user, setUser] = useState("");
  const navigation = useNavigation()
  const { userId, setUserId } = useContext(UserType);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    // getting the current user from the database
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

  const getRecentlyPlayedSongs = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
      const response = await axios({
        method: "GET",
        url: "https://api.spotify.com/v1/me/player/recently-played?limit=20",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const tracks = response.data.items;
      setRecentlyPlayed(tracks);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getRecentlyPlayedSongs();
  }, [])



const logout = () => {
  clearAuthToken();
}
const clearAuthToken = async () => {
  // clearing all of the data that is stored inside of the AsyncStorage for the previous logged in user
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("expirationDate");
  await AsyncStorage.removeItem("authToken");
  console.log("Cleared asyncStorage");
  navigation.replace("Login")
}


  return (
    <ScrollView style={{marginTop:60}}>

      <View style={{ flexDirection:"row", alignItems:"center", marginHorizontal
    : 10, }}>
        <Image source={{ uri:user?.profilePic}} style={styles.profilePic}/>
        <View style={{ padding:10 }}>
          <Text style={styles.displayName} >{user?.username}</Text>
          {/* <Text style={styles.email} >{user?.email}</Text> */}
        </View>
      </View>

      {/* {recentlyPlayed.map((item, index) => (
        <RecentlyPlayed item={item} key={index} />
      ))} */}

      <View>
        <Pressable
          onPress={logout}
          style={{
            backgroundColor:"#CC0000",
            height:50,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderRadius: 5,
            marginTop:10,
            margin:10
          }}
        >
          <Text style={{fontSize:18, color:"white", textAlign:"center", fontWeight:"bold"}}>Logout</Text>
        </Pressable>
      </View>
        
      <Text style={{ fontSize:22, fontWeight:"bold", marginHorizontal:10, marginTop:10 }}>Recently Played</Text>
      {recentlyPlayed.map((item, index) => (
        <RecentlyPlayed item={item} key={index} />
      ))}


    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profilePic: {
    width:100,
    height:100,
    borderRadius:50,
    resizeMode:"cover",
    marginTop:15,
    marginLeft:10
  },
  displayName: {
    color:"black",
    fontSize:25,
    fontWeight:"bold",
    marginLeft:30
  },
  email: {
    color:"gray",
    fontSize:17,
    fontWeight:"bold",
  },
})