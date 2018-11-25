import React, { Component } from 'react';
import Pirate from './components/Pirate'
import Header from './components/Header'
import PirateForm from './components/PirateForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Pirate tagline="Ahoy there!" />
        <PirateForm />
      </div>
    );
  }
}

export default App;
