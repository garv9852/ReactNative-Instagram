import React from 'react'
import {View,StyleSheet,ScrollView,useColorScheme} from 'react-native'
import Header from "../components/Home/Header"
import Post from '../components/Home/Post'
import Stories from '../components/Home/Stories'
import Bottom from '../components/Home/Bottom'
function HomeScreen({navigation}) {
  return (
    <View style={styles.mainContainer}>
        <Header navigation={navigation}/>
        <ScrollView>
          <Stories/>
          <Post/>
        </ScrollView>
        <Bottom/>
    </View>
  )
}

const styles=StyleSheet.create({
    mainContainer:{
        backgroundColor:"black",
        flex:1
    }
})

export default HomeScreen