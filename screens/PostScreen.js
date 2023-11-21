import { StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView, Modal, FlatList } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import SearchedTracks from '../components/SearchedTracks';

const PostScreen = () => {
  const [searched, setSearched] = useState("");
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const search = async () => {
    console.log(`Searching for ${searched}`)
    const accessToken = await AsyncStorage.getItem("token");
    try {
      const response = await axios({
        method: "GET",
        url: `https://api.spotify.com/v1/search?q=${searched}&type=track&limit=20`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSearchedTracks(response.data.tracks.items);
    } catch(error) {
      console.log("error searching for songs")
      console.log(error)
    }
  }


  
  return (
    <ScrollView style={{marginTop:60}}>
      <View style={{ flexDirection:"row"}}>

        <TextInput
          style={{
            flex:1,
            marginLeft:5
          }}
          activeOutlineColor="black"
          mode="outlined"
          label="Search for a song"
          value={searched}
          onChangeText={searched => setSearched(searched)}
        />

        <Pressable
          onPress={() => search()}
          style={{
            backgroundColor:"#1DB954",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderRadius: 5,
            margin:5
          }}
        >
          <Text style={{fontSize:18, color:"white", textAlign:"center", fontWeight:"bold"}}>Search</Text>
        </Pressable>
      </View>
      
      <View>

        {searchedTracks.map((item, index) => (
            <SearchedTracks item={item} key={index} />
        ))}
      </View>

    </ScrollView>
  )
}

export default PostScreen

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})