import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const PostedSongs = ({item}) => {
  return (
    <View style={{ margin: 10, flexDirection:"row" }}>
        <Text>{item?.user.username}</Text>
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
      </View>
    </View>
  )
}

export default PostedSongs

const styles = StyleSheet.create({})