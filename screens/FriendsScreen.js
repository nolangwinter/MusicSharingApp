import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { UserType } from '../UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import User from '../components/User'

const FriendsScreen = () => {
  const [selectedButton, setSelectedButton] = useState("all");
  const {userId, setUserId} = useContext(UserType);
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  // this changes what the current selected button is
  const handleButton = async (button) => {
    setSelectedButton(button);
    await fetchFollowing();
  }
  
  // this function communicates with the backend to get the users that the current user is following
  const fetchFollowing = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    // user context
    setUserId(userId);

    axios.get(`http://localhost:3000/follow/${userId}`).then((response) => {
      setFollowing(response.data)
    }).catch((error) => {
      console.log("error following ", error);
    })
  }

  // this grabs all of the users except for the user that is currently logged in from the database
  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      // user context
      setUserId(userId);

      axios.get(`http://localhost:3000/user/${userId}`).then((response) => {
        setUsers(response.data)
      }).catch((error) => {
        console.log("error ", error);
      })
    }

    fetchUsers();
  }, [])

   // this grabs all of the users that the logged in user is following
   useEffect(() => {
    fetchFollowing();
  }, [])

  // console.log("following", following);

  // console.log("all", users);

  return (
    <SafeAreaView>
      <View style={{flexDirection: "row", justifyContent:"space-between", padding: 10}}>
        <TouchableOpacity
          onPress={() => handleButton("all")}
          style={[
            {
          flex:1,
          paddingVertical:10,
          paddingHorizontal:20,
          backgroundColor:"white",
          borderColor:"#D0D0D0",
          borderRadius:6,
          borderWidth:0.7,
          },
          selectedButton === "all" ? {backgroundColor: "#1DB954"} : null
        ]}
        >
          <Text
            style={[
              {
                fontWeight: "bold",
                fontSize: 18,
              },
              selectedButton === "all" ? {color: "white"} : {color: "#1DB954"}
            ]}
          >
            All Users
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleButton("follow")}
          style={[
              {
            flex:1,
            paddingVertical:10,
            paddingHorizontal:20,
            backgroundColor:"white",
            borderColor:"#D0D0D0",
            borderRadius:6,
            borderWidth:0.7,
            },
            selectedButton === "follow" ? {backgroundColor: "#1DB954"} : null
          ]}
        >
          <Text
            style={[
              {
                fontWeight: "bold",
                fontSize: 18,
                textAlign:"center"
              },
              selectedButton === "follow" ? {color: "white"} : {color: "#1DB954"}
            ]}
          >
            Following
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        renderItem={({ item }) => (
            <User item={ item } />
        )}
        keyExtractor={(item) => item._id}
    />

      {/* <View>
        {selectedButton === "all" && (
          <View >
            {users?.map((item, index) => (
              <User key={index} item={item} />
            ))}
          </View>
        )}
      </View>

      <View>
        {selectedButton === "follow" && (
          <View >
            {following?.map((item, index) => (
              <User key={index} item={item} />
            ))}
          </View>
        )}
      </View> */}
    </SafeAreaView>
  )
}

export default FriendsScreen

const styles = StyleSheet.create({})