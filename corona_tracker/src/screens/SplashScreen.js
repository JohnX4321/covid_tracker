import React from 'react';
import {View,StyleSheet,Text,Image,PermissionsAndroid} from 'react-native';

export default class SplashScreen extends React.Component{


   async componentDidMount(): void {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Storage Permission",
                    message: "App needs access to memory to download the file "
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert("Permission granted","Now you can download anything!");
            } else {
                Alert.alert(
                    "Permission Denied!",
                    "You need to give storage permission to download the file"
                );
            }
        } catch (err) {
            console.warn(err);
        }
    }


    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <View style={styles.main}>
                <Text style={{fontSize: 21}}>
                    Corona Tracker
                </Text>
                <Image source={require('../../splash.png')} style={{width: 225,height: 225}} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main :{
        flex :1,
        alignItems :"center",
        justifyContent : "center",
    }
});
