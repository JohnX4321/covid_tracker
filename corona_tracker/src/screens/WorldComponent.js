import React from 'react';
import {View,Text} from 'react-native';

export default class WorldComponent extends React.Component{

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <View>
                <Text>
                    {this.props.world.active}
                </Text>
            </View>
        );
    }

}
