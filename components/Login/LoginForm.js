import { View, TextInput,StyleSheet,Text,Button, TouchableOpacity,Alert } from 'react-native'
import React from 'react'
import * as Yup from "yup"
import { Formik } from 'formik'
import {firebase} from '../../firebase'
export default function LoginForm({navigation}) {
  const loginSchema=Yup.object().shape({
    loginId:Yup.string().email("Enter a vaild Email ID").required("Email Id is required"),
    password:Yup.string().min(8,"Password Length has to be more than 8").required("Password is required")
  })
  const onLogin=async(email,password)=>{
    try{
      await firebase.auth().signInWithEmailAndPassword(email,password);
    }catch(error)
    {
      Alert.alert(error.message);
    }
  }
  return (
    <Formik
      initialValues={{loginId:"",password:""}}
      onSubmit={values=>{
        onLogin(values.loginId,values.password)
      }}
      validationSchema={loginSchema}
      >
        {
          ({handleBlur,handleChange,handleSubmit,values,errors,isValid})=>(
            <View style={{width:"100%",alignItems:"center"}}>
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
                autoFocus={false}
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
              <View style={{flexDirection:"row",justifyContent:"flex-end",width:"90%",padding:1}}>
                  <TouchableOpacity><Text style={{color:"#0095f6",fontWeight:"600"}}>Forgot Password?</Text></TouchableOpacity>
              </View>
              <View  style={{width:"90%",marginTop:20}}><Button onPress={handleSubmit} title="Log In" disabled={!isValid}/></View>
              <View style={{flexDirection:"row",marginTop:40}}>
                  <Text>Don't have an account </Text>
                  <TouchableOpacity onPress={()=>navigation.push("SignupScreen")}><Text style={{color:"#0095f6",fontWeight:"600"}}>Sign Up</Text></TouchableOpacity>
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
        marginTop:20
    }
})