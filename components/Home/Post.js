import React, { useEffect,useState } from 'react'
import {Text, View, Image,StyleSheet, Touchable, TouchableOpacity} from "react-native"
import { POST } from '../../ddata/posts'
import {postFooter} from '../../ddata/postFooterIcons'
import { db } from '../../firebase'
function Post() {
    const [post,setPost]=useState(POST);
    useEffect(()=>{
        return db.collectionGroup('posts').onSnapshot(snapshot=>{
            setPost(snapshot.docs.map(doc=>doc.data()));
        })
    })
  return (
    <View>
        {
            post.map((e,i)=>(
                <View key={i}>
                    <View key={i} style={styles.mainContainer}>
                        <View style={styles.postHeaderLeft}>
                            <TouchableOpacity>
                                <Image style={styles.postHeaderProfile} source={{uri:e.profilePicture}}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.postHeaderName}>{e.user}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity><Text style={styles.postHeaderRight}>...</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <View style={{width:"100%",height:450}}>
                            <Image style={styles.postImage} source={{uri:e.imageUrl}}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.postFooter}>
                        <View style={styles.postFooterIcons}>
                            <View style={styles.postFooterLeft}>
                                <TouchableOpacity><Image style={styles.postFooterIcon} source={{uri:postFooter[0].imageUrl}}/></TouchableOpacity>
                                <TouchableOpacity><Image style={[styles.postFooterIcon,{marginLeft:5}]} source={{uri:postFooter[1].imageUrl}}/></TouchableOpacity>
                                <TouchableOpacity><Image style={[styles.postFooterIcon,{marginLeft:5}]} source={{uri:postFooter[2].imageUrl}}/></TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity><Image style={styles.postFooterIcon} source={{uri:postFooter[3].imageUrl}}/></TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.likes}>{e.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} likes</Text>
                        <Text style={{color:"white"}}>
                            <Text style={{fontWeight:"600",color:"white"}}>{e.user} </Text>
                            {e.caption}
                        </Text>
                        {
                            e.comments.length>0?<Text style={{color:"grey",marginVertical:5}}>View all {e.comments.length} comments</Text>
                            :
                            null
                        }
                        <View>
                            {
                                [...e.comments.slice(0,2)].map((ei,k)=>(
                                    <Text style={{color:"white"}} key={k}>
                                        <Text style={{fontWeight:"600",color:"white"}}>{ei.user} </Text>
                                        {ei.comment}
                                    </Text>
                                ))
                            }
                        </View>
                    </View>
                </View>
            ))
        }
    </View>
  )
}

const styles=StyleSheet.create({
    mainContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:15,
        paddingVertical:8,
        borderTopWidth:1,
        borderColor:"grey"
    },
    postHeaderLeft:{
        flexDirection:"row",
        alignItems:"center"
    },
    postHeaderProfile:{
        width:40,
        height:40,
        borderRadius:30,
        borderWidth:2,
        borderColor:"#ff8501"
    },
    postHeaderName:{
        marginLeft:8,
        color:"white",
        paddingBottom:5,
        fontWeight:"500"
    },
    postHeaderRight:{
        color:"white",
        alignItems:"center",
        fontSize:20
    },
    postImage:{
        height:"100%",
        resizeMode:"cover"
    },
    postFooter:{
        marginVertical:10,
        marginHorizontal:12,
    },
    postFooterIcons:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    postFooterLeft:{
        flexDirection:"row"
    },
    postFooterIcon:{
        height:30,
        width:30,
    },
    likes:{
        color:"white",
        marginVertical:3,
        fontWeight:"600"
    }
})
export default Post