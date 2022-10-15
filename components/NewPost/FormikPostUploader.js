import { View, Text, TextInput,Image, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Formik } from 'formik'
import { Divider } from 'react-native-elements';
import im from "../../assets/icons8-image-50.png"
import validUrl from "valid-url"
import {db,firebase} from "../../firebase"
const uploadPostSchema=Yup.object().shape({
  imageUrl:Yup.string().url().required("A URL is required"),
  caption:Yup.string().max(2200,'Caption has reached the character Limit')
})
export default function FormikPostUploader({navigation}) {
    const [thumbnailUrl,setThumbnailUrl]=useState("");
    const [currentLoggedInUser,setCurrentLoggedInUser]=useState(null)
    const getUsername=async ()=>{
      const user=firebase.auth().currentUser;
      const loggedInUser=(await db.collection("users").doc(user.email).get()).data();
      setCurrentLoggedInUser({
        username:loggedInUser.username,
        profilePicture:loggedInUser.profile_picture
      })
    }
    useEffect(()=>{
      getUsername();
    },[]);
    const uploadPostFirebase=(imageUrl,caption)=>
    {
      const unsubscribe=db.collection('users')
      .doc(firebase.auth().currentUser.email).collection('posts')
      .add({
        imageUrl:imageUrl,
        user:currentLoggedInUser.username,
        profilePicture:currentLoggedInUser.profilePicture,
        owner_uid:firebase.auth().currentUser.uid,
        caption:caption,
        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        likes:0,
        likes_by_users:[],
        comments:[]
      })
      .then(()=>navigation.goBack());
      return unsubscribe;
    }
  return (
    <Formik
    initialValues={{caption:"",imageUrl:''}}
    onSubmit={values=>{
      uploadPostFirebase(values.imageUrl,values.caption)
    }}
    validationSchema={uploadPostSchema}
    // validateOnMount={true}
    >
      {
        ({handleBlur,handleChange,handleSubmit,values,errors,isValid})=>(
            <View style={{margin:15}}>
              <View style={{flexDirection:"row",marginBottom:10}}>
                <Image style={{width:120,height:120,borderRadius:5}} source={validUrl.isUri(thumbnailUrl)?{uri:thumbnailUrl}:im}/>
                <TextInput
                placeholder='Write a caption'
                placeholderTextColor="grey"
                multiline={true}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
                style={{color:"white",marginLeft:10,fontSize:16,width:"100%"}}/>
              </View>
              <Divider width={0.2} orientation='vertical'/>
              <TextInput
              onChange={(e)=>setThumbnailUrl(e.nativeEvent.text)}
              placeholder='Enter Image Url'
              placeholderTextColor="grey"
              style={{color:"white",margin:2,fontSize:18}}
              onChangeText={handleChange('imageUrl')}
              onBlur={handleBlur('imageUrl')}
              value={values.imageUrl}/>
              {errors.imageUrl && (
                <Text style={{fontSize:10,color:"red"}}>
                  {errors.imageUrl}
                </Text>
              )}
              <Button onPress={handleSubmit} title="Share" disabled={!isValid}/>
            </View>
        )
      }
    </Formik>
  )
}