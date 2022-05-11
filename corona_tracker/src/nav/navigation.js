import React from 'react';
import {SafeAreaView,View,Text,StyleSheet,ScrollView,Image} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator,BottomTabBar} from 'react-navigation-tabs';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SplashScreen from '../screens/SplashScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import IndiaComponent from '../screens/IndiaComponent';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AboutScreen from '../screens/AboutScreen';
import WebScreen from '../screens/WebScreen';


const defaultOptionsForStack={
    defaultNavOptions :{
        headerStyle:{
            backgroundColor: '#023953',
            elevation: 1,
            shadowOpacity: 0,
            height: 50
        },
        headerTitleAlign: 'center',
        headerTintColor: '#86e3b3',
        headerTitleStyle:{
            fontWeight: 'bold',
            color: '#86e3b3',
            fontSize: 15
        }
    }
};

const CategoriesStack=createStackNavigator({
    Categories:{
        screen: CategoriesScreen,
        navigationOptions:{
            headerTitle: "My Country",
            headerStyle: {backgroundColor: '#86e3b3'}
        }
    },
},defaultOptionsForStack);

const WebStack=createStackNavigator({
    Web:{
        screen: WebScreen,
        navigationOptions: {
            headerTitle: "Additional Data"
        }
    }
},defaultOptionsForStack);

const HomeStack = createStackNavigator({

        Home : {
            screen : HomeScreen,
            navigationOptions : {
                headerTitle : "World Updates",
                headerStyle: {backgroundColor: '#86e3b3'}
            }
        },

        // Cart : {
        //     screen : CartScreen
        // }

    }, defaultOptionsForStack

);

const FavStack = createStackNavigator({

        FavScreen : {
            screen : FavoritesScreen,
            navigationOptions : {
                headerTitle : "Search Country",
                headerStyle: {backgroundColor: '#86e3b3'}
            }
        },

//     Cart : {
//         screen : CartScreen
//     }

    }, defaultOptionsForStack

);

const AboutStack = createStackNavigator({

        FavScreen : {
            screen : AboutScreen,
            navigationOptions : {
                headerTitle : "About Us",
                headerStyle: {backgroundColor: '#86e3b3'}
            }
        },

//     Cart : {
//         screen : CartScreen
//     }

    }, defaultOptionsForStack

);

const TabNavigator = createBottomTabNavigator({
        Home : {
            screen : HomeStack,
            navigationOptions : {
                tabBarIcon: ({ tintColor }) => {
                    return   <Icon name="globe-americas" size={20} color={tintColor} />
                }
            }
        },


        Categories: {
            screen :  CategoriesStack,
            navigationOptions : {
                tabBarIcon: ({ tintColor }) => {
                    return   <Image source={require('../../indlogo.png')} style={{width:20, height: 20}} />
                }

            },


        },

        "Favourites": {
            screen :  FavStack,
            navigationOptions : {
                tabBarIcon: ({ tintColor }) => {
                    return   <Icon name="search" size={20} color={tintColor} />
                }
            }
        },
    Web:{
        screen: WebStack,
        navigationOptions:{
            tabBarIcon: ({tintColor})=>{
                return <Image source={require('../../karlogo.png')} style={{width: 20,height: 20}}  />
            }
        }
    },

        About:{
            screen: AboutStack,
            navigationOptions:{
                tabBarIcon: ({ tintColor }) => {
                    return   <Icon name="info-circle" size={20} color={tintColor} />
                }
            }
        }




    }, {
        tabBarOptions : {
            showLabel : false,
            activeTintColor : "#008fb3",
            inactiveTintColor : "#42f598",
            tabStyle : {height : 50 , zIndex:99, borderColor:"white", borderTopWidth:0},
            labelStyle : {fontSize: 12, paddingTop:2,paddingBottom:3, fontFamily : "halfmoon_bold",},
        }
    }


);


const NavigationDrawer = createDrawerNavigator({
        Home: {
            screen : TabNavigator,
            navigationOptions : {
                drawerIcon: ({ tintColor }) => {
                    return   <Icon name="home" size={20} color={tintColor} />
                }
            }
        },
        Categories : {
            screen : CategoriesScreen,
            navigationOptions : {
                drawerIcon: ({ tintColor }) => {
                    return   <Icon name="th-list" size={20} color={tintColor} />
                }
            }
        },

        Favourites : {
            screen : FavoritesScreen,
            navigationOptions : {
                drawerIcon: ({ tintColor }) => {
                    return    <Fontisto name="heart" size={20} color={tintColor} />
                }
            }
        },

        About:{
            screen: AboutScreen,
            navigationOptions:{
                tabBarIcon: ({ tintColor }) => {
                    return   <Icon name="info-circle" size={20} color={tintColor} />
                }
            }
        },

        Web:{
            screen: WebScreen,
            navigationOptions:{
                tabBarIcon: ({tintColor})=>{
                    return <Icon name="space-shuttle" size={20} color={tintColor} />
                }
            }
        }





    },
    {
        contentComponent: (props) => (
            <SafeAreaView>
                <View style={{height: 100,alignItems: 'center', justifyContent: 'center'}}>

                    <Text style={{fontSize: 32}}>LOGO</Text>
                </View>
                <ScrollView>
                    <DrawerItems {...props} />
                </ScrollView>
            </SafeAreaView>
        )
    });

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer ;

