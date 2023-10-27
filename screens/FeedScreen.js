import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, {useContext, useEffect} from 'react'
import { UserType } from '../UserContext';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FeedScreen = () => {
  const { userId, setUserId } = useContext(UserType);

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

    console.log("userId ",userId);

  return (
    <SafeAreaView>
      <Text>FeedScreen</Text>
    </SafeAreaView>
  )
}

export default FeedScreen

const styles = StyleSheet.create({})