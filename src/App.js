import React, { Component } from 'react';
import Map from './components/Map'
import Search from './components/Search'
import * as FoursquareAPI from './FoursquareAPI'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      venues: [],
      defaultMarkers: [],
      defaultCenter: { lat: 30.0444196, lng: 31.2357116 },
      query: '',
      defaultZoom: 17,
      veneusList : [],
      selectedMarkerId : []
      
    }
    this.params = {
      v: '20180802',
      ll: [this.state.defaultCenter.lat, this.state.defaultCenter.lng].join(','),
      query: this.state.query,
      limit: 50,
      intent: 'browse',
      radius: '1000',
      // venuesList : [],
      client_id: 'C3FWNCOB31A0JJAQ321PP5IYZVTDCXPDPVQSYLD4EPFWYFYI',
      client_secret: 'NOTNZFMCB14R1JVE1JYPR13SJCQK1CJOPREN4E1SFDI3ZEW4',
    }
  }
  
  componentDidMount() {
    this.getDefaultVenues();
  }
  getDefaultVenues = () => {
    FoursquareAPI.getAllVenues(this.params).then((response) => {
      this.setState({ defaultMarkers: response,
                        venuesList:response.map((name,index)=>{return response[index].name})
      })
    });

  }
//   handleSearch(event) {
// 		this.setState({
// 			query: event.target.value.toLowerCase(),
//     })
//     // infowindow.close();

//     // filter list markers by name of location
//     const searchedVenues = this.state.defaultMarkers.filter((marker) => {
//       const match = marker.name.toLowerCase().indexOf(this.state.query) > -1;
//       // console.log(marker.id)
//       let selectedMarkerId= []
//       selectedMarkerId.push(marker.id)
//       // marker.marker.setVisible(match);
//       return match;
// this.setState({defaultMarkers : searchedVenues}) 
//    })
//    console.log(this.state.selectedMarkerId)
// 		// this.params.query = this.state.query;
// 		console.log(this.state.query);
// 		console.log(this.params)

// 		// console.log(this.state.venuesList)
// 	}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighborhood Map</h1>
        </header>
        <Search className="venues"
          defaultVenues={this.state.defaultMarkers}
          venuesList = {this.state.venuesList}
          query = {this.state.query } 
          params = {this.state.params}  
          center = {this.state.defaultCenter}      
       /* <div>
       <input className = 'input-field'
      //  value ={this.state.query}
				onChange={this.handleSearch.bind(this)} type='text' 
				placeholder='I am looking for' />
				<button className = 'search-button'
				// onClick = {this.searchVenues.bind(this)}
				>in cairo</button>
				<ul className = 'venues'>
				{this.state.defaultMarkers.map((venue)=>{
						return( <li key ={venue.id} >{venue.name}</li>)
				})
			}
				</ul>
       </div> */
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
