import React, { Component } from 'react'
import {StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
import IndiaComponent from './IndiaComponent';
import {Keyboard} from 'react-native';
const {NovelCovid} = require('novelcovid');
const covid=new NovelCovid();

export default class FavoritesScreen extends React.Component{


    static navigationOptions=({navigation})=>{
        return{
            headerTitleStyle: {flex: 1,textAlign: 'center'},
        };
    };

    state={
        message: "Enter Country",
        india: [],
        loading: true,
        countryName: '',
        countryFlag: '',
        tableTitle: ['Country Name', "Cases", "Today Cases", "Deaths", "Today Deaths", "Recovered","Active","Critical"],
        heightArr : [40,40,40,40,40,40,40,40],
    }

    searchCountry=()=>{
        covid.countries( this.state.countryName).then(
            (data)=>{
                const tableData =[] ;
                const keys = ["country", "cases", "todayCases", "deaths", "todayDeaths", "recovered","active", "critical"];
                for(let i=0;i<8;i++){
                    const key = keys[i];
                    const item = data[key];
                    tableData.push(item);
                }
                this.setData(tableData, data.countryInfo);
            }
        ).catch((e)=>{this.displayError();});
    }

    displayError=()=>{
        this.setState({
            message: 'Sorry. Unable to retireve',
            loading: true,
            countryName: ''
        });
    }


    setData=(data,flag)=>{
        Keyboard.dismiss();
        this.setState({
            india: data,
            loading: false,
            countryFlag: flag.flag,
            countryName: ""
        });
    }



    render() {
        let payload = { id: 'button-1' };
        return (
            <View style={styles.main}>
                <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-around",marginTop:10}}>
                    <TextInput value={this.state.countryName} onChangeText={(countryName) => this.setState({countryName})} placeholder="Enter Country Name " style={styles.input}/>
                    <RaisedTextButton titleColor="white" color="#00cccc" title='Search' onPress={this.searchCountry} payload={payload} />
                </View>
                {this.state.loading?<View style={{flex:1,  alignItems:"center"}}><Text style={{marginLeft:10, marginTop:20, fontSize:20}}>{this.state.message}</Text></View>:<IndiaComponent data={this.state}/>}

            </View>
        )
    }


}

const styles = StyleSheet.create({
    main :{
        flex :1,
        backgroundColor:"#f2f2f2",
        //alignItems :"center",
        // justifyContent : "center",
    },
    input:{
        borderWidth:1,
        padding:10,
        width:200,
        height:60,
        fontSize: 20,
        borderRadius:5
    }
});
