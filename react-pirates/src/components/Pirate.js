import React, { Component } from 'react';
import '../assets/css/Pirate.css'

class Pirate extends Component {
  render(){
    return (
      <p>{this.props.tagline}</p>
      )
  }
}

export default Pirate;