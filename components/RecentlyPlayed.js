import { Alert, StyleSheet, Text, View, Image, Pressable, Modal } from 'react-native'
import React, { useState, useContext } from 'react'
import { UserType } from '../UserContext';
import axios from 'axios';

const RecentlyPlayed = ({item}) => {
  console.log

  const alertPost = () => {
    Alert.alert(
      // title
      'Post Successful',
      // text
      'Your song has been posted.',
      [
        {
          text: 'OK',
          onPress: () => console.log('Confirmed Alert') ,style: 'cancel'
        },
      ],
      {cancelable: false},
    );
  };

  const {userId, setUserId} = useContext(UserType);

    const handlePostSubmit = () => {
        const postData = {
          userId,
          song: item?.track?.name,
          artist: item?.track?.artists[0].name,
          album: item?.track?.album?.images[0].url,
        };
        console.log(postData)
    
        axios
          .post("http://localhost:3000/create-post", postData)
          .then((response) => {
            alertPost();
          })
          .catch((error) => {
            console.log("error creating post", error);
          });

        
    };

  return (
    <View style={{ margin: 10, flexDirection:"row" }}>
      <Image
        source={{ uri:item?.track?.album?.images[0].url }}
        style={{
            width:90,
            height:90,
            borderRadius:5,
        }}
      />
      <View style={{ justifyContent:"center", marginHorizontal:10, flex:1}}>
        <Text numberOfLines={2} style={{ fontSize:18, fontWeight:"700", flexWrap: 'wrap'}}>{item?.track?.name}</Text>
        <Text style={{ fontSize: 15, fontWeight:"500", marginTop:6, color:"#71797E" }}>{item?.track?.artists[0].name}</Text>
      </View>

      <View style={{alignItems:"center", justifyContent:"center"}}>
            <Pressable
              onPress={handlePostSubmit}
              style={{
                  backgroundColor:"#1DB954",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  borderRadius: 5,
                  height:50,
              }}
          >
            <Text style={{fontSize:18, color:"white", textAlign:"center", fontWeight:"bold"}}>Post</Text>
          </Pressable>
        </View>

    </View>
  )
}

export default RecentlyPlayed

const styles = StyleSheet.create({})