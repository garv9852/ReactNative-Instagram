import React from 'react'
import {ScrollView, StyleSheet, Text, View,Image, TouchableOpacity} from "react-native"
import {users} from '../../ddata/users';
function Stories() {
  return (
    <View style={styles.mainContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
      >
        {
          users.map((e,i)=>(
            <TouchableOpacity style={styles.stories} key={i}>
              <Image 
                style={styles.storiesImage}
                source={{
                  uri:e.image
                }}
              />
              <Text style={{color:"white",textAlign:"center"}}>{e.user.length>11?e.user.slice(0,8)+'..':e.user}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  )
}

const styles=StyleSheet.create({
  mainContainer:{
    marginBottom:13,
  },
  storiesImage:{
    width:70,
    height:70,
    borderRadius:40,
    borderWidth:4,
    borderColor:"#ff8501"
  },
  stories:{
    marginLeft:5,
  }
})

export default Stories;