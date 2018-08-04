import React, { Component } from 'react';
import Map from './components/Map'
import Search from './components/Search'
import * as FoursquareAPI from './FoursquareAPI'
import './App.css';

class App extends Component {
  state = {
    venues: [],
    defaultMarkers: [],
    defaultCenter: { lat: 27.2578957, lng: 33.8116067 },
    query: 'hotel',
    defaultZoom: 15,
    veneusList : []
  }
  setParameters = () => {
    const params = {
      v: '20180802',
      ll: [this.state.defaultCenter.lat, this.state.defaultCenter.lng].join(','),
      query: this.state.query,
      limit: 30,
      intent: 'browse',
      radius: '1000',
      // venuesList : [],
      client_id: 'C3FWNCOB31A0JJAQ321PP5IYZVTDCXPDPVQSYLD4EPFWYFYI',
      client_secret: 'NOTNZFMCB14R1JVE1JYPR13SJCQK1CJOPREN4E1SFDI3ZEW4',
    };
    return params;

  }

  componentDidMount() {
    let params = this.setParameters();
    this.getDefaultVenues(params);
    // let list = defaultMarker.map()
  }
  getDefaultVenues = (params) => {
    FoursquareAPI.getAllVenues(params).then((response) => {
      this.setState({ defaultMarkers: response,
                        venuesList:response.map((name,index)=>{return response[index].name})
      })
                        console.log(this.state.venuesList)
           
    });

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighborhood Map</h1>
        </header>
        <Search className="venues"
          defaultVenues={this.state.defaultMarkers}
          venuesList = {this.state.venuesList}
        
          />
        <Map 
          searchedVenues={this.state.venues}
          defaultVenues={this.state.defaultMarkers}
          defaultCenter={this.state.defaultCenter}
          defaultZoom={this.state.defaultZoom}
        />
      </div>
    );
  }
}

export default App;
