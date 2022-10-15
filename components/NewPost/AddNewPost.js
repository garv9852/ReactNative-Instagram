import React from 'react'
import {TouchableOpacity,Image,View,Text,StyleSheet} from 'react-native'
import FormikPostUploader from './FormikPostUploader';
function AddNewPost({navigation}) {
  return (
    <View>
        <Header navigation={navigation}/>
        <FormikPostUploader navigation={navigation}/>
    </View>
  )
}
export default AddNewPost;

const Header=({navigation})=>{
    return(
        <View style={styles.mainContainer}>
            <Img style={{width:30,height:30,marginLeft:15}} onPress={()=>navigation.goBack()} source="https://img.icons8.com/external-becris-lineal-becris/64/ffffff/external-left-arrow-mintab-for-ios-becris-lineal-becris.png"/>
            <Text style={styles.text}>NEW POST</Text>
            <Text></Text>
        </View>
    )
}
const styles=StyleSheet.create({
    mainContainer:{
        flexDirection:"row",
        marginVertical:15,
        justifyContent:"space-between"
    },
    text:{
        fontWeight:"600",
        fontSize:18,
        color:"white",
        marginRight:40
    }
})
const Img=({style,source,onPress})=>{
    return(
        <TouchableOpacity onPress={onPress}>
            <Image style={style} source={{uri:source}}></Image>
        </TouchableOpacity>
    )
}