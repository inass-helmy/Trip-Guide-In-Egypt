import React, { Component } from 'react';
import Map from './components/Map'
import Search from './components/Search'
import * as FoursquareAPI from './FoursquareAPI'
import './App.css';

class App extends Component {
state = {
  venues: []
}

componentDidMount() {
  this.getAllVenues();
  console.log(this.state.venues)

}

getAllVenues = () => {
FoursquareAPI.getAllVenues().then((venues)=> {
  this.setState({venues})
})
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighborhood Map</h1>
        </header>
        <Search className="venues"/>
        <Map/>
      </div>
    );
  }
}

export default App;
