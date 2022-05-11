import React , {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import SplashScreen from "./src/screens/SplashScreen";
import AppContainer from "./src/nav/navigation";
import AsyncStorage from '@react-native-community/async-storage';
import PushController from './src/PushController';
import PushNotification from 'react-native-push-notification';

export default class App extends Component {
  state = {
    loading:true,
  };
  componentDidMount = ()=>{
    this.showApp();

    this.getFirst().then(data=>{

        if (data!=='false') {

            this.storeFirst().then(
                PushNotification.localNotification({
                    vibration: 300,
                    priority: 'high',
                    importance: 'high',
                    title: 'Thanks for downloading our app',
                    message: 'Happy to serve the public. Team ThingSenz.'
                })
            );
        }

    });




  }

  getFirst=async()=>{
    const first=await AsyncStorage.getItem('is_first');
    return first;
  };

  storeFirst=async (first)=>{
    await AsyncStorage.setItem('is_first','false');
  };

  showApp = ()=>{
    setTimeout(()=>{
      this.setState({
        loading:false
      });
    },1500);
  }
  render() {
    // const App = <SplashScreen/>
    // if(!this.state.loading){
    //   App =  <AppContainer/>
    // }
    return (
        this.state.loading?<View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
          <StatusBar backgroundColor="#023953" barStyle="light-content" />
          <SplashScreen/>
          <PushController />
        </View>:<AppContainer><PushController /></AppContainer>
    )
  }

}
