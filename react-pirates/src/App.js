import React, { Component } from 'react';
import Pirate from './components/Pirate'
import Header from './components/Header'
import PirateForm from './components/PirateForm'
import piratesFile from './data/sample-pirates-object';

class App extends Component {

  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.removePirate = this.removePirate.bind(this);
    this.state = {
      pirates: {},
      isLoading: true
    }
  }

  componentDidMount(){
    this.setState({ isLoading: true });
    fetch('http://localhost:3005/api/pirates')
    .then(response => response.json())
    .then(pirates => this.setState({pirates, isLoading: false}))
  }

  render() {

    const { isLoading } = this.state;

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    
    return (
      <div className="App">
        <Header headline="Pirates!" />
        
          {
            Object.keys(this.state.pirates)
            .map(key =>
              <Pirate key={key}
                index={key}
                details={this.state.pirates[key]}
                removePirate={this.removePirate} />)
          }

        <PirateForm loadSamples={this.loadSamples} addPirate={this.addPirate} />
      </div>
    );
  }

  loadSamples() {
    this.setState({
      pirates: piratesFile
    })
  }

  removePirate(key){
    const pirates = {...this.state.pirates}
    delete pirates[key]
    this.setState({pirates})
  }

  addPirate(pirate) {
    //take a copy of the current state and put it into pirates var
    const pirates = {...this.state.pirates}
    //create a unique id
    const timestamp = Date.now()
    //add new pirate using accessor and id - objectName["propertyName"] and assignment
    pirates[`pirate-${timestamp}`] = pirate
    //set state pirates with var pirates
    this.setState({ pirates: pirates })
  }

}

export default App;
