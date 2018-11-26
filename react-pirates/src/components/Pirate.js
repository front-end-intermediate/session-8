import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../assets/css/Pirate.css'

class Pirate extends Component {
  render(){
    const { details } = this.props;
    return (
      <div className='pirate'>
      <ul>
      <li><Link to={`/roster/${details._id}`}>{details.name}</Link></li>
      <li>{details.weapon}</li>
      <li>{details.vessel}</li>
      <li><button onClick={() => this.props.removePirate(this.props.index)}>✖︎</button></li>
      {/* <li><button onClick={() => this.props.removePirate(this.props.key)}>✖︎</button></li> */}
      </ul>
      </div>
      )
  }
}
export default Pirate;