import { View, TextInput,StyleSheet,Text,Button, TouchableOpacity,Alert } from 'react-native'
import React from 'react'
import * as Yup from "yup"
import { Formik } from 'formik'
import {firebase,db} from "../../firebase"
export default function SignupForm({navigation}) {
  const signUpSchema=Yup.object().shape({
    name:Yup.string().required("Name is required"),
    loginId:Yup.string().email("Enter a vaild Email ID").required("Email Id is required"),
    password:Yup.string().min(8,"Password Length has to be more than 8").required("Password is required")
  })
  const onSignup=async(name,email,password)=>{
    try{
      const auth=await firebase.auth().createUserWithEmailAndPassword(email,password);
      await db.collection("users").doc(auth.user.email).set({
        uid:auth.user.uid,
        username:name,
        email,
        profile_picture:await getRandomProfilePicture(),
        password,
      })
      navigation.push("LoginScreen")
    }catch(error)
    {
      Alert.alert(error.message);
    }
  }
  const getRandomProfilePicture=async ()=>{
    const response=await fetch('https://randomuser.me/api');
    const data=await response.json();
    return data.results[0].picture.large;
  }
  return (
    <Formik
      initialValues={{name:"",loginId:"",password:""}}
      onSubmit={values=>{
        onSignup(values.name,values.loginId,values.password)
      }}
      validationSchema={signUpSchema}
      >
        {
          ({handleBlur,handleChange,handleSubmit,values,errors,isValid})=>(
            <View style={{width:"100%",alignItems:"center"}}>
              <TextInput
                placeholder='Name'
                placeholderTextColor="grey"
                style={styles.inputBox}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                autoCapitalize="none"
                autoFocus={false}
              />
              {errors.name && (
                <View style={{width:"90%",justifyContent:"flex-start",margin:2}}><Text style={{fontSize:10,color:"red"}}>{errors.loginId}</Text></View>
              )}
              <TextInput
                placeholder='Email ID'
                placeholderTextColor="grey"
                style={styles.inputBox}
                onChangeText={handleChange('loginId')}
                onBlur={handleBlur('loginId')}
                value={values.loginId}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="email-address"
              />
              {errors.loginId && (
                <View style={{width:"90%",justifyContent:"flex-start",margin:2}}><Text style={{fontSize:10,color:"red"}}>{errors.loginId}</Text></View>
              )}
              <TextInput
                placeholder='Password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholderTextColor="grey"
                style={styles.inputBox}
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry={true}
                autoCorrect={false}
              />
              {errors.password && (
                <View style={{width:"90%",justifyContent:"flex-start",margin:2}}><Text style={{fontSize:10,color:"red"}}>{errors.password}</Text></View>
              )}
              <View  style={{width:"90%",marginTop:20}}><Button onPress={handleSubmit} title="Log In" disabled={!isValid}/></View>
              <View style={{flexDirection:"row",marginTop:40}}>
                  <Text>Have an account? </Text>
                  <TouchableOpacity onPress={()=>navigation.push("LoginScreen")}><Text style={{color:"#0095f6",fontWeight:"600"}}>Log in</Text></TouchableOpacity>
              </View>
            </View>
          )
        }
      </Formik>
  )
}

const styles=StyleSheet.create({
    inputBox:{
        width:"90%",
        padding:10,
        borderRadius:10,
        backgroundColor:"white",
        marginTop:20,
    }
})