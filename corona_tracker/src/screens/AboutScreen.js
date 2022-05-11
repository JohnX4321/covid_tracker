import React, { Component } from 'react'
import {StyleSheet, View, Text, Linking, TouchableOpacity, Image} from 'react-native';

import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from 'react-native-vector-icons/Entypo';


export default class AboutScreen extends React.Component{

    static navigationOptions=({navigation})=>{
        return{
            headerTitleStyle: {flex: 1, textAlign: 'center'}
        };
    }

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return(
        <View style={styles.main}>
            <View style={{backgroundColor: "#86e3b3",height: "50%",width: '100%', justifyContent: 'center',alignItems: 'center'}}>
                <View styel={{justifyContent: "center"}}>

                    <Image source={require("./thingsenzlogo.jpeg")} style={{width:300, height:240, borderRadius:20, borderColor:"#66ff66", borderWidth:1}}/>


                </View>
            </View>

            <View style={{flexDirection:"row", justifyContent:"center", marginLeft:80, marginRight:80}}>

                <TouchableOpacity onPress={
                    ()=>{Linking.openURL("https://thingsenz.github.io")}
                } style={{ width:"25%", justifyContent:"center"}}>
                    <View style={{ width:"100%", padding:10}}>
                        <Icon name="flickr" color="#476bb8" size={30} style={{alignSelf:"center",}}/>

                    </View>



                </TouchableOpacity>



                <TouchableOpacity onPress={
                    ()=>{Linking.openURL("https://github.com/JohnX4321/corona_tracker/releases")}
                } style={{ width:"25%", justifyContent:"center"}}>
                    <View style={{ width:"100%", padding:10}}>
                        <Icon name="arrow-up" color="#476bb8" size={30} style={{alignSelf:"center",}}/>

                    </View>



                </TouchableOpacity>


                <TouchableOpacity onPress={
                    ()=>{Linking.openURL("https://forms.gle/K7XoH4qkmU2V46EU8")}
                } style={{ width:"25%", justifyContent:"center"}}>
                    <View style={{ width:"100%", padding:10}}>
                        <FontAwesome name="space-shuttle" color="#476bb8" size={30} style={{alignSelf:"center"}}/>

                    </View>



                </TouchableOpacity>






            </View>


            <View style={{flexDirection: 'column', justifyContent: 'center',alignItems: 'center'}}>

                <Text style={{fontSize: 15, justifyContent: 'center'}}>Developer - Samarth</Text>
                <Text style={{fontSize: 15, justifyContent: 'center'}}>Data Acquisition & Management  - Chiranth and Rakshith</Text>

            </View>


            <View style={{flexDirection:"column", justifyContent:"center", alignItems: 'center', marginLeft:80, marginRight:80,marginTop: 40}}>
                <Text style={{fontSize: 22,justifyContent: 'center', color: 'red'}}>NOTE</Text>
                <Text>Developed to allow people to monitor the Total Cases around the world. Data fetched from Third Party API. No data is shared</Text>
            </View>


        </View>
        );

    }


}

const styles = StyleSheet.create({
    main :{
        flex :1,
        // alignItems :"center",
        // justifyContent : "center",
        backgroundColor:"white",
        //  padding:10,
    },

    buttonText: {
        color:"white",
        alignContent:"center",
        fontSize:20,
        alignSelf:"center",
        fontFamily:"KulimPark-Regular",
    },
});

