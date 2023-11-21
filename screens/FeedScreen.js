import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, {useEffect, useContext, useState, useCallback } from 'react';
import { UserType } from '../UserContext';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import PostedSongs from '../components/PostedSongs';


const FeedScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [posts, setPosts] = useState([]);

    // setting the current userId when the user logs in
    useEffect(() => {
      const fetchUsers = async () => {
        const token = await AsyncStorage.getItem("authToken");
        console.log("token", token);
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        // user context
        setUserId(userId);
      }
  
      fetchUsers();
    }, [])

    // gets the posts from the database
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-posts");
  
        setPosts(response.data);
      } catch (error) {
        console.log("error fetching posts ", error);
      }
    }

    useEffect(() => {
      fetchPosts();
    }, [])
  
    // this updates the posts whenever the screen is visited 
    useFocusEffect(
      useCallback(() => {
        fetchPosts();
      })
    )

  return (
    <ScrollView style={{marginTop:60}}>
      {posts?.map((item, index) => (
        <PostedSongs item={item} index={index} />
      ))}
    </ScrollView>
  )
}

export default FeedScreen

const styles = StyleSheet.create({})