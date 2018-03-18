import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Mains
class View extends Component {
	// constructor() {
	// 	super()
	// 	this.state = {
	// 		src: "http://localhost:8000/stream/",
	// 		showSpinner: true
	// 	}
	// }

	// componentDidMount() {
    //     var self = this;
    //     var img = new Image();
    //     img.onerror = function () {
    //         self.setState({ 
	// 			src: 'http://localhost:8000/stream/',
	// 			showSpinner: 
	// 		});
    //     };
    //     img.src = this.state.src;
    // }

	render() {
		return (
			<div id="view" className="d-flex position-absolute bg-transparent">
				<div className="bg-dark w-100 d-flex justify-content-center align-items-center">
					{/* { this.state.showSpinner ? <i class="fa fa-spinner fa-4x  fa-spin"></i> : <img src={this.state.src} alt="Standby"/>} */}
					<img id="bg-video" src="http://localhost:8000/stream/" alt="Standby"/>
				</div>
			</div>
		);
	}
}
// mains

// Overlay
// displays
function Header(props) {
	return(
		<div id="overlay-header" className="mb-auto d-flex p-5 justify-content-center align-items-center">
			<div id="overlay-top" className="d-flex justify-content-center align-items-center px-3 py-1">
				<div className="d-flex flex-direction-row">
					<div className="overlay-label mr-2 justify-content-end">Direction</div>
					<div className="d-flex align-items-center">{props.direction}</div>
					<img id="overlay-logo" className="mx-5" src={logo} alt="Attackle logo"/>
					<div className="d-flex align-items-center">{props.mode}</div>
					<div className="overlay-label ml-2 justify-content-start">Mode</div>
				</div>
			</div>
		</div>
	)
}

class TelemetryData extends Component {
	constructor(props) {
		super(props)
		this.state = {
			battery: null,
			speed: null,
			altitude: null,
			infrared: null,
			long: null,
			lat: null
		}
	}

    generateItem(item) {
        return (
			<tr key={item.name}>
				<td><span className="mr-5">{item.name}</span></td>
				<td><span className="ml-4">{item.data}</span></td>
			</tr>
		);
    }

    render() {
        const items = this.props.items.map(this.generateItem);
        return (
			<div id="telemetry" className="ml-auto p-3">
				<table>
					<tbody>
						{items}
					</tbody>
				</table>
			</div>
        ); 
    }
}
class Footer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			battery: null,
			speed: null,
			altitude: null,
			infrared: null,
			long: null,
			lat: null
		}
	}

	render() {
		var telemetry = [
			{
				name: "Battery",
				data: this.state.battery
			},
			{
				name: "Speed",
				data: this.state.speed
			},
			{
				name: "Altitude",
				data: this.state.altitude
			},
			{
				name: "Infrared",
				data: this.state.infrared
			},
			{
				name: "Longitude",
				data: this.state.long
			},
			{
				name: "Latitude",
				data: this.state.lat
			}
		]
		return(
			<div id="overlay-footer" className="d-flex mt-auto p-5 bg-transparent">
				<div id="telemetry" className="mr-auto">
					<iframe title="telemetry-map" id="telemetry-map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d41659.092084554926!2d-123.1298649!3d49.26325970000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sca!4v1521266536642">
					</iframe>
				</div>
				<TelemetryData items={telemetry}/>
			</div>
		)
	}
}
// object
class Overlay extends Component {
	constructor(props) {
		super(props)
		this.state = {
			mode: {
				user: "USER",
				auto: "AUTO"
			},
			direction: {
				stay: "STAT",
				forward: "FRWD",
				reverse: "BKWD",
				left: "LEFT",
				right: "RGHT"
			},
			modeStatus: null,
			dirStatus: null
		};

		this.state.dirStatus = this.state.direction.stay;
		this.state.modeStatus = this.state.mode.user;
	}

	handleKeyPress(event) {
		if (event.key === " ") {
			this.setState({ modeStatus: !this.state.modeStatus }, function stateUpdateComplete() {
				console.log(this.state.modeStatus);
				fetch('https://thawing-woodland-49697.herokuapp.com/api/motion', {
					method: 'POST',
					body: JSON.stringify({type:this.state.modeStatus}),
					headers: {
						"Content-Type": "application/json"
					},
				});
			}.bind(this));
		}
	}

	handleKeyDown(event) {
		if (!this.state.modeStatus) {
			let arr =  ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
			let val = arr.indexOf(event.key);
			if (val >= 0) {
				return;
			}
		}

		let dir;
		switch(event.key) {
			case "ArrowUp":
				dir = this.state.direction.forward
				break;
			case "ArrowDown":
				dir = this.state.direction.reverse
				break;
			case "ArrowLeft":
				dir = this.state.direction.left
				break;
			case "ArrowRight":
				dir = this.state.direction.right
				break;
			default:
				dir = this.state.direction.stay
				break;
		}

		this.setState({ dirStatus: dir }, function stateUpdateComplete() {
			console.log(this.state.dirStatus);
			fetch('https://thawing-woodland-49697.herokuapp.com/api/motion', {
				method: 'POST',
				body: JSON.stringify({type:this.state.dirStatus}),
				headers: {
					"Content-Type": "application/json"
				},
			});
		}.bind(this));
	}

	handleKeyUp(event) {
		this.setState({ dirStatus: this.state.direction.stay }, function stateUpdateComplete() {
			console.log(this.state.dirStatus);
			fetch('https://thawing-woodland-49697.herokuapp.com/api/motion', {
				method: 'POST',
				body: JSON.stringify({type: this.state.dirStatus}),
				headers: {
					"Content-Type": "application/json"
				},
			});

		}.bind(this));
	}

	render() {
		return (
			<div id="overlay" className="d-flex flex-column position-absolute">
				<Header direction={this.state.dirStatus} mode={this.state.modeStatus ? this.state.mode.user:this.state.mode.auto} />
				<Footer />
				<div id="key-window" 
					className="position-absolute"
					onKeyPress={(event) => this.handleKeyPress(event)}
					onKeyDown={(event) => this.handleKeyDown(event)}
					onKeyUp={(event) => this.handleKeyUp(event)}
					tabIndex="0">
				</div> 
			</div>
		);
	}
}
// overlay


// App
class App extends Component {
	render() {
		return (
			<div className="app d-flex h-100 ">
				<View />
				<Overlay />
			</div>
		);
	}
}

export default App;
