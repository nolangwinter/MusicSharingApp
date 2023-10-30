import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const RecentlyPlayed = ({item}) => {
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
    </View>
  )
}

export default RecentlyPlayed

const styles = StyleSheet.create({})