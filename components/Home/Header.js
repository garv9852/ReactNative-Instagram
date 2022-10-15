import React from 'react'
import { View,Text,Image,StyleSheet, TouchableOpacity, Alert } from 'react-native'
import {firebase} from "../../firebase"
function Header({navigation}) {
    const onSignOut=async()=>{
        try{
            await firebase.auth().signOut();
        }
        catch(error)
        {
            Alert.alert(error.message);
        }
    }
  return (
    <View style={styles.mainContainer}>
        <TouchableOpacity onPress={onSignOut}>
            <Image
            style={styles.logo} 
            source={require('../../assets/header-logo.png')}/>
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={()=>navigation.push("NewPostScreen")}>
                <Image
                style={styles.icon}
                source={{uri:"https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png"}}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                style={styles.icon} 
                source={{uri:"https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png"}}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>12</Text>
                </View>
                <Image
                style={styles.icon} 
                source={{uri:"https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png"}}/>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles=StyleSheet.create({
    mainContainer:{
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        marginHorizontal:20
    },
    logo:{
        width:100,
        height:50,
        resizeMode:'contain',
    },
    iconsContainer:{
        flexDirection:"row",
    },
    icon:{
        width:30,
        height:30,
        marginLeft:10,
        resizeMode:'contain'
    },
    unreadBadge:{
        backgroundColor:'#FF3250',
        position:"absolute",
        left:20,
        bottom:18,
        width:25,
        height:20,
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center",
        zIndex:100
    },
    unreadBadgeText:{
        color:"white",
        fontWeight:"800"
    }
})
export default Header