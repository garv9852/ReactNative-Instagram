import React, { useState } from 'react'
import {View,Image,StyleSheet, TouchableOpacity} from 'react-native'
import { bottomTabIcons } from '../../ddata/BottomTabIcons'
function Bottom() {
    const [active,setActive]=useState("Profile");
  return (
    <View style={styles.mainContainer}>
        {
            bottomTabIcons.map((e,key)=>(
                active==e.name?
                    <TouchableOpacity key={key}>
                        <Image style={[styles.bottomIcons,e.name=="Profile"?styles.profileImage:{}]} source={{uri:e.active}}/>
                    </TouchableOpacity>
                :
                    <TouchableOpacity key={key} onPress={()=>setActive(e.name)}>
                        <Image style={styles.bottomIcons} source={{uri:e.inactive}}/>
                    </TouchableOpacity>
            ))
        }
    </View>
  )
}

const styles=StyleSheet.create({
    mainContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginHorizontal:20,
        marginVertical:10
    },
    bottomIcons:{
        width:30,
        height:30,
        borderRadius:20,
    },
    profileImage:{
        borderWidth:2,
        borderColor:"red"
    }
})
export default Bottom