import React from 'react';
import {WebView} from 'react-native-webview';
import {BackHandler} from 'react-native';

export default class WebScreen extends React.Component{

    constructor() {
        super();
        this.AndroidBack=this.AndroidBack.bind(this);
    }
    webView={
        canGoBack: false,
        ref: null
    }

    AndroidBack=()=>{
        if (this.webView.canGoBack&&this.webView.ref){
            this.webView.ref.goBack();
            return true;
        }
        return false;
    }

    componentWillMount(): void {
        BackHandler.addEventListener('hardwareBackPress',this.AndroidBack);
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <WebView source={{uri: ''}}
            ref={(webView)=>{this.webView.ref=webView;}}
                        onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
        />
    }

}
