import { View,StyleSheet,Text,Image, TextInput,useColorScheme } from 'react-native'
import React from 'react'
import LoginForm from '../components/Login/LoginForm'

export default function LoginScreen({navigation}) {
  const theme=useColorScheme();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={{height:100,width:200,resizeMode:"contain"}} source={require("../assets/loginlogo.png")}/>
      </View>
      <LoginForm navigation={navigation}/>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    alignItems:"center",
    paddingTop:"50%",
    // backgroundColor:"black",
    height:"100%"
  },
  dark:{
    backgroundColor:"black"
  },
  light:{
    backgroundColor:'white'
  }
})