import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { UserType } from '../UserContext';


const User = ({ item }) => {
    const { userId, setUserId } = useContext(UserType);
    const [followed, setFollowed] = useState(false);


    const sendFollow = async (currentUserId, selectedUserId) => {
        try {
          const response = await fetch("http://localhost:3000/follow", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ currentUserId, selectedUserId }),
          });
    
          if (response.ok) {
            setFollowed(true);
            console.log("Followed Successfully")
          }
        } catch (error) {
          console.log("error message", error);
        }
      };
    
      const handleUnfollow = async (targetId) => {
        try {
          const response = await fetch("http://localhost:3000/users/unfollow", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              loggedInUserId: userId,
              targetUserId: targetId,
            }),
          });
    
          if(response.ok){
              console.log("unfollowed successfully")
              setFollowed(false);
          }
        } catch (error) {
          console.log("Error", error);
        }
      };

    // Reset the followed state whenever the userId or item prop changes
      useEffect(() => {
        setFollowed(false);
      }, [userId, item]);

  return (
<View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop:20 }}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "contain",
            marginLeft: 10,
          }}
          source={{
            uri: item?.profilePic,
          }}
        />

        <Text style={{ fontSize: 18, fontWeight: "500", flex: 1 }}>
          {item?.username}
        </Text>

        {followed || item?.followers?.includes(userId) ? ( 
          <Pressable
            onPress={() => handleUnfollow(item?._id)}
            style={{
              borderColor: "#D0D0D0",
              borderWidth: 1,
              padding: 10,
              marginRight: 10,
              width: 100,
              borderRadius: 8,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
            >
              Following
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => sendFollow(userId, item._id)}
            style={{
              backgroundColor: "#1DB954",
              borderColor: "#D0D0D0",
              borderWidth: 1,
              padding: 10,
              marginRight: 10,
              width: 100,
              borderRadius: 8,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 15, fontWeight: "bold", color:"white" }}
            >
              Follow
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}

export default User

const styles = StyleSheet.create({})