import React, { Component } from 'react';
import '../assets/css/AddPirateForm.css';

class AddPirateForm extends Component {
  render(){
    return (
      <div>
        <h3>Add Pirate Form Component</h3>
      <form onSubmit={ (e) => this.createPirate(e)}>
        <input type="text" placeholder="Pirate name" />
        <input type="text" placeholder="Pirate vessel" />
        <input type="text" placeholder="Pirate weapon" />
        <button type="submit">Add Pirate</button>
      </form>
      </div>
      )
  }

  createPirate(e) {
    e.preventDefault();
    console.log('making a pirate')
  }
}

export default AddPirateForm;