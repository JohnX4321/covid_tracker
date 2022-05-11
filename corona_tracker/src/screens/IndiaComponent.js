import React from 'react';
import {View,Text,Image,StyleSheet,ScrollView,Button,Linking} from 'react-native';
import {Table,TableWrapper,Row,Rows,Col} from 'react-native-table-component';


export default class IndiaComponent extends React.Component{

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const state=this.props.data;
        return (

            <ScrollView>
                <View style={{padding: 2}}>
                    <View style={{alignItems: 'center', marginTop: 5,padding: 10}}>
                        <Image source={{uri: state.countryFlag}} style={{width: 140,height: 100}} />
                    </View>
                    <Table borderStyle={{borderWidth: 1, borderColor:"black"}}>
                        <TableWrapper style={styles.wrapper}>
                            <Col data={state.tableTitle} style={styles.title} heightArr={state.heightArr} textStyle={styles.text}/>
                            <Col data={state.india} style={styles.title2} heightArr={state.heightArr} textStyle={styles.text2}/>
                        </TableWrapper>
                    </Table>

                    {
                        state.countryFlag==='https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/in.png'?<Button title='Click for state-wise info' onPress={()=>{Linking.openURL('https://www.covid19india.org')}}>Click for Statewise Info</Button>:null
                    }

                </View>

            </ScrollView>

        )
    }

}


const styles = StyleSheet.create({

    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    wrapper: { flexDirection: 'row', },
    title: { flex: 1, backgroundColor: '#e6f5ff', },
    title2: { flex: 1, backgroundColor: '#e6fffa', },
    row: {  height: 28  },
    text: { textAlign: 'center', color:"black" },
    text2: { textAlign: 'center', color:"black" }
});
