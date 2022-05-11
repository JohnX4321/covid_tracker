import React from "react";
import PushNotification from "react-native-push-notification";

export default class PushController extends React.Component{

    componentDidMount(): void {

        PushNotification.configure({
            onNotification: function (notification) {
            console.log("NOTIFS: ",notification);
            },
            senderID: "67004180098",
            permissions:{
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true
        });

    }

    render() {
        return null;
    }


}
