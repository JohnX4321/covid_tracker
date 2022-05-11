import React, { Component } from 'react'
import {StyleSheet, View, Text , Button} from 'react-native';
import IndiaComponent from "./IndiaComponent";
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
const parseString = require('react-native-xml2js').parseString;
//const covid = require('novelcovid');
const {NovelCovid}=require('novelcovid');
const covid=new NovelCovid();
class CategoriesScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleStyle: { flex: 1, textAlign: 'center'},
        };
    };
    state  = {
        india : [],
        loading : true,
        countryName : '',
        countryFlag: '',
        tableTitle: ['Country Name', "Cases", "Today Cases", "Deaths", "Today Deaths", "Recovered","Active","Critical"],
        heightArr : [60,40,40,40,40,40,40,40],

    }
    setData = (data, flag)=>{
        this.setState({
            india:data,
            loading:false,
            countryFlag : flag.flag,

        },);
    }
    componentDidMount = ()=>{
        this.setCountryName('India');
    }
    setCountryName = (name)=>{
        this.setState({
            countryName:name
        },()=>{
            covid.countries(this.state.countryName).then(
                (data)=>{

                    const tableData =[] ;
                    const keys = ["country", "cases", "todayCases", "deaths", "todayDeaths", "recovered","active", "critical"];
                    for(let i=0;i<8;i++){
                        const key = keys[i];
                        const item = data[key];
                        tableData.push(item);
                    }
                    //console.log(tableData);
                    this.setData(tableData, data.countryInfo);
                }
            );
        });
    }
    render() {
        const state = this.state;
        return (
            <View style={styles.main}>
                {this.state.loading?<View style={{alignItems:"center",height:200 }}>
                    <View style={{marginTop:100,}}>
                        <Text style={{fontSize:19, color:"black"}}>Loading Data.. Please Wait...</Text>
                    </View>
                    <View>
                        <PulseIndicator color='#023953' size={100} style={{height:40}} />
                    </View>

                </View>:<IndiaComponent data={this.state}/>}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main :{
        flex :1,
        // alignItems :"center",
        backgroundColor:"#f2f2f2"

    },

});

export default CategoriesScreen;
