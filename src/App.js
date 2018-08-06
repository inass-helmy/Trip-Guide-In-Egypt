import React, { Component } from 'react';
import Map from './components/Map'
import Search from './components/Search'
import sortBy from 'sort-by'
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
      showInfoIndex: null,
      newCenter:{lat: 30.0444196, lng: 31.2357116},
      newZoom : 15,
      defaultZoom: 15,
      veneusList : [],
      selectedMarkerId : [],
      hasVenues: false,
      userDidSearch: false,
      searchQuery: '',
      listOpen: null,
      searchedVenues: [],
    }
    this.params = {
      ll: [this.state.defaultCenter.lat, this.state.defaultCenter.lng].join(','),
      query: this.state.query,   
    }
    this.userDidSearch = this.userDidSearch.bind(this)
  }
  
  componentDidMount() {
    this.getDefaultVenues();
  }
  getDefaultVenues = () => {
    FoursquareAPI.getAllVenues(this.params).then((response) => {
      response.sort(sortBy('name'))
      this.setState({ defaultMarkers: response,
                        venuesList:response.map((name,index)=>{return response[index].name}),
                        hasVenues:true
      })
    });

  }

  onToggleOpen = (venueId, location, infowindowClose) => {
    const markerLocation = {lat: location.lat, lng: location.lng}
    this.setState({
      showInfoIndex: venueId,
      newCenter: markerLocation,
      newZoom: 19,
      infowindowClose
    });
    console.log('inside map toggle',this.state.showInfoIndex)
  };
userDidSearch(searchedVenues, query) {
  this.setState({
searchedVenues,
searchQuery:query,
userDidSearch: true
  })
  console.log('search list', this.state.searchedVenues)
}
  render() {
    const {userDidSearch, defaultMarkers, searchedVenues, searchQuery} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighborhood Map</h1>
        </header>
        <Search className="venues"
          defaultVenues={this.state.defaultMarkers}
          venuesList = {this.state.venuesList}
          query = {this.state.query } 
          params = {this.params}  
          center = {this.state.defaultCenter} 
          hasVenues = {this.state.hasVenues}  
          onUserDidSearch = {this.userDidSearch}
          onToggleOpen = {this.onToggleOpen}
          />
        <Map 
          searchedVenues={this.state.searchedVenues}
          defaultVenues={userDidSearch && searchQuery? searchedVenues : defaultMarkers }
          defaultCenter={this.state.defaultCenter}
          defaultZoom={this.state.defaultZoom}
          newCenter = {this.state.newCenter}
          newZoom = {this.state.newZoom}
          userDidsearch = {this.state.userDidSearch}
          listOpen ={this.state.listOpen}
          showInfoIndex = {this.state.showInfoIndex}
          onToggleOpen = {this.onToggleOpen}
        />
      </div>
    );
  }
}

export default App;
