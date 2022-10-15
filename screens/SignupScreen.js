import { View, StyleSheet, Image,useColorScheme } from 'react-native'
import React from 'react'
import SignupForm from '../components/Signup/SignupForm'
export default function SignupScreen({navigation}) {
  const theme=useColorScheme();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={{height:100,width:200,resizeMode:"contain"}} source={require("../assets/loginlogo.png")}/>
      </View>
      <SignupForm navigation={navigation}/>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
      alignItems:"center",
      paddingTop:"50%",
      height:"100%"
    },
  })