import React from 'react'
import {StyleSheet, View, Button, Text, ScrollView, StatusBar} from 'react-native';
import {
    PacmanIndicator,
    PulseIndicator,

    WaveIndicator,

} from 'react-native-indicators';
import { Table, TableWrapper, Row } from 'react-native-table-component';
//const covid=require('novelcovid');
const {NovelCovid}=require('novelcovid');
const covid=new NovelCovid();

export default class HomeScreen extends React.Component{

    static navigationOptions=({navigation})=>{
        return{
            title: navigation.getParam("title"),
            headerTitleStyle: {flex: 1,textAlign: 'center'},
        };
    };

    state={
        tableHead: ['Country Name', 'Cases', 'Today Cases', 'Deaths', 'Today Deaths', 'Recovered', 'Active','Critical', ],
        widthArr: [150, 100, 100, 100, 100, 100, 100,100 ],
        data : null,
        loading : true,
    }
    setData=(data)=>{}

    componentDidMount(): void {
        /*covid.getCountry({sort: 'cases'}).then(
            (data)=>{
                this.setState({
                    loading: false,
                    data,
                });
            }
        );*/
        covid.countries(null,'cases').then((data)=>{
            this.setState({
                loading: false,
                data
            })
        })
    }





    render() {
        let TableView = null;
        if(!this.state.loading){
            const data = this.state.data;
            const keys = ["country", "cases", "todayCases","deaths", "todayDeaths", "recovered","active", "critical"];
            const tableData = [];
            for (let i = 0; i < data.length; i += 1) {
                const rowData = [];
                for (let j = 0; j < 8; j += 1) {
                    rowData.push(data[i][keys[j]]);
                }
                tableData.push(rowData);
            }
            TableView =  <ScrollView horizontal={true}>
                <View>
                    <StatusBar backgroundColor="#023953" barStyle="light-content" />
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.header} textStyle={styles.text}/>
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            {
                                tableData.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={this.state.widthArr}
                                        style={[styles.row, index%2 && {backgroundColor: 'white'}]}
                                        textStyle={styles.textRow}
                                    />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        }
        else{
            TableView = <View style={{alignItems:"center",height:200 }}>
                <StatusBar backgroundColor="#023953" barStyle="light-content" />
                <View style={{marginTop:100,}}>
                    <Text style={{fontSize:19, color:"black"}}>Feeding Data From Server Please Wait...</Text>
                </View>
                <View>
                    <PacmanIndicator color='#023953' size={100} style={{height:40}} />
                </View>

                <View style={{marginTop:100,}}>
                    <Text style={{fontSize:19, color:"red",justifyContent: 'center',textAlign: 'center'}}>In case of blank feed, please upgrade to the latest version, if available, of app from our download page in about section. You will also be notified</Text>
                </View>

            </View>
        }
        return (
            <View style={styles.container}>
                {TableView}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#fff' },
    header: { height: 40, backgroundColor: '#262626', },
    text: { textAlign: 'center', fontWeight: '100',color:"white" },
    textRow: { textAlign: 'center', fontWeight: '100',color:"black" },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#e6faff' }
});
