import React, {Component} from 'react';
import {
    AppRegistry,
    asset,
    Pano,
    Text,
    View,
    Video,
    VideoControl,
    MediaPlayerState
} from 'react-vr';
import Fixed from './fixed.vr'

class HUDTop extends Component {
    render() {
        return(
            <Fixed>
                <View style={{backgroundColor: 'red', flex: 0.5}} >
                    <Text>HUDTop</Text>
                </View>
            </Fixed>
        );
    }
}
class HUDBottomLeft extends Component {
    render() {
        return(
            <View style={{flexDirection: 'row', height: 1, padding: 0.2}}>
                <View style={{backgroundColor: 'blue', flex: 0.3}}>
                <Text>HUDBottomLeft</Text>
                </View>
            </View>
        );
    }
}
class HUDBottomRight extends Component {
    render() {
        return(
            <View style={{flexDirection: 'row', height: 1, padding: 0.2}}>
                <View style={{backgroundColor: 'blue', flex: 0.3}} >
                    <Text>HUDBottomRight</Text>
                </View>
            </View>
        );
    }
}

class Overlay extends Component {
    constructor() {
        super();
    }
    render() {
        return(
            <View
                style={{
                    flexDirection:'column'
                }}>
                <HUDTop />
                <View
                    style={{
                        flexDirection:'row'
                    }}>
                    <HUDBottomLeft />
                    <HUDBottomRight />
                </View>
            </View>
        );
    }
}

class NomadVR extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        return (
            <View>
                <Pano source={asset('chess-world.jpg')} />
                <View
                    style={{
                        alignItems: 'center',
                        layoutOrigin: [0.5, 0.5, 0],
                        transform: [{translate: [0, 0, -3]}],
                    }}>
                    <Overlay />
                </View>
            </View>
        );
    }
};

export default NomadVR

AppRegistry.registerComponent('nomadVR', () => NomadVR);
