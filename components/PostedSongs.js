import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import {AntDesign} from '@expo/vector-icons'
import { UserType } from '../UserContext';
import axios from 'axios';

const PostedSongs = ({item}) => {
  const { userId, setUserId } = useContext(UserType);

  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/posts/${postId}/${userId}/like`
      );
    } catch (error) {
      console.log("Error liking the post", error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/posts/${postId}/${userId}/unlike`
      );
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/posts/${postId}/${userId}/dislike`
      );
    } catch (error) {
      console.log("Error liking the post", error);
    }
  };

  const handleUndislike = async (postId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/posts/${postId}/${userId}/undislike`
      );
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  return (
    <View style={{ margin: 10, flexDirection:"row" }}>
      <Image
        source={{ uri:item?.albumArt }}
        style={{
            width:90,
            height:90,
            borderRadius:5,
        }}
      />
      <View style={{ justifyContent:"center", marginHorizontal:10, flex:1}}>
        <Text numberOfLines={2} style={{ fontSize:18, fontWeight:"700", flexWrap: 'wrap'}}>{item?.songName}</Text>
        <Text style={{ fontSize: 15, fontWeight:"500", marginTop:6, color:"#71797E" }}>{item?.artistName}</Text>
        <View style={{ flexDirection:"row", marginTop:15}}>
          <Text style={{ fontWeight:"bold", marginRight:20 }}>{item?.user.username}</Text>
          {/* if the posts likes contain the logged in user id then the post is already liked by them */}
          {item?.likes?.includes(userId) ? (
            <View style={{flexDirection:"row", marginRight:10}}>
              <Text>{item?.likes?.length}</Text>
              <AntDesign
                onPress={() => handleUnlike(item?._id)}
                name="like1"
                size={18}
                color="black"
              />
            </View>

            
          ) : (
            <View style={{flexDirection:"row", marginRight:10}}>
              <Text>{item?.likes?.length}</Text>
              <AntDesign
                onPress={() => handleLike(item?._id)}
                name="like2"
                size={18}
                color="black"
              />
            </View>
          )}

          {/* if the posts dislikes contain the logged in user id then the post is already disliked by them */}
          {item?.dislikes?.includes(userId) ? (
           <View style={{flexDirection:"row"}}>
              <Text>{item?.dislikes?.length}</Text>
              <AntDesign
                onPress={() => handleUndislike(item?._id)}
                name="dislike1"
                size={18}
                color="black"
              />
            </View>
          ) : (
            <View style={{flexDirection:"row", marginRight:10, justifyContent:"center"}}>
              <Text style={{ marginRight:3, textAlign:"center"}}>{item?.dislikes?.length}</Text>
              <AntDesign
                onPress={() => handleDislike(item?._id)}
                name="dislike2"
                size={18}
                color="black"
              />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default PostedSongs

const styles = StyleSheet.create({})