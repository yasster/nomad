import React from 'react';
import {
  VrHeadModel,
  View
} from 'react-vr';

/**
 * Helper to fix a component to the viewport.
 * @module components/fixed
 * @property {number}  stickiness - The delay in ms between state updates. Lower values = less visual lag.
 */
class Fixed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hmRot: VrHeadModel.rotation()
    }
  }
  componentDidMount(){
    let {stickiness} = this.props;
    this.timer = setInterval(()=>{this.tick()}, stickiness);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  shouldComponentUpdate(nextProps, nextState){
    return nextState.hmRot !== this.state.hmRot;
  }
  tick(){
    this.setState({
      hmRot: VrHeadModel.rotation()
    });
  }
  render(){
    let {hmRot} = this.state;
    return (
      <View
        style={{
          position: 'absolute',
          layoutOrigin: [0.5, 0.5],
          transform: [
            {translate: [0, 0, 0]},
            {rotateX: hmRot[0]},
            {rotateY: hmRot[1]},
            {rotateZ: hmRot[2]}
          ]
        }}>
        <View
          style={{
            position: 'absolute',
            layoutOrigin: [0.5, 0.5],
            transform: [
              {translate: [0, 0, 0]}
            ]
          }}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

module.exports = Fixed;