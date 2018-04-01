import React, { Component } from 'react';
import {
	AppRegistry,
	asset,
	Pano,
	Text,
	View,
	Video,
	Image,
} from 'react-vr';

// Templates
class HUD extends Component {
	render() {
		return (
			<Text
				style={{
					fontSize: 0.1,
					fontWeight: '400',
					paddingLeft: 0.2,
					paddingRight: 0.2,
					textAlign: 'center',
					textAlignVertical: 'center',
				}}>
				{this.props.name}
			</Text>
		);
	}
}

// Components
function StatusBar(props) {
	return(
		<View 
			style={{
				position: 'absolute',
				transform: [
          {translate: [0, 0.9, -2]},
          {rotateX: 30},
        ],
        layoutOrigin: [0.5, 0.5],
        height: 0.12,
        width: 1.5,
        backgroundColor: '#777879bd',
        borderRadius: 0.03,
			}} >
		</View>
	);
}
function DataWindow(props) {
	return(
		<View 
			style={{
				position: 'absolute',
				transform: [
					{translate: [1.3, -0.7, -2]},
					{rotateY: -30},
					{rotateX: -20},
				],
        layoutOrigin: [0.5, 0.5],
        height: 0.5,
        width: 0.6,
        backgroundColor: '#777879bd',
        borderRadius: 0.03,
			}} >
			<HUD name=""/>
		</View>
	);
}
function Map(props) {
	return (
		<View 
			style={{
				position: 'absolute',
				transform: [
          {translate: [-1.3, -0.7, -2]},
          {rotateY: 30},
          {rotateX: -20},
        ],
        layoutOrigin: [0.5, 0.5],
        height: 0.5,
        width: 0.6,
        backgroundColor: '#777879bd',
        borderRadius: 0.03,
			}} >
			<HUD name=""/>
		</View>
	);
}

class Feed extends Component {
	render() {
		return(
			<View
				style={{
					layoutOrigin: [0.5, 0.5],
					transform: [
            {translate: [0, 0, -3]},
          ],
					zIndex: -1,
				}}>
				<Image 
					style={{ 
						width: 4, 
						height: 2,
						opacity: 1,
					}}
					source={asset('bg.jpg')}
				/>
			</View>
		);
	}
}

// App
class NomadVR extends Component {
	render() {
		return (
			<View>
				<Pano source={asset('hex-world.jpg')}/>
				<Feed />
				<StatusBar />
				<DataWindow />
				<Map />
			</View>
		);
	}
};

export default NomadVR

AppRegistry.registerComponent('nomad-vr', () => NomadVR);
