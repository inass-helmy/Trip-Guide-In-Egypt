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
      defaultMarkers: [],
      defaultCenter: { lat: 30.0444196, lng: 31.2357116 },
      defaultZoom: 14,
      newCenter:{lat: 30.0444196, lng: 31.2357116},
      newZoom : 14,
      veneusList : [],
      showInfoId: null,
      hasVenues: false,
      userDidSearch: false,
      searchQuery: '',
      listOpen: null,
      searchedVenues: [],
      params: {}
}
this.params = {
  ll: [this.state.defaultCenter.lat, this.state.defaultCenter.lng].join(','),
  query: '',   
}
this.listOfCities = [{
  name: 'Cairo',
  id: 1,
location: { lat: 30.0444196, lng: 31.2357116 }
},
  {
  name : 'Sharm El-Sheikh',
  id : 2,
  location: {lat: 27.915817, lng : 34.329950} 
},
{
  name: 'Hurghada',
  id: 3,
  location: {lat: 27.257896, lng : 33.811607}

},
{
  name: 'Alexandria',
  id: 4,
  location: {lat: 31.205753, lng: 29.924526}
},
{
  name: 'Marsa Matrouh',
  id: 5,
  location: {lat: 31.354343, lng: 27.237316}

},
{
  name: 'Luxor',
  id: 6,
  location: {lat: 25.687243, lng: 32.639637}
},
]

this.userDidSearch = this.userDidSearch.bind(this);
this.mapDraged = this.mapDraged.bind(this)

  }
  
  componentDidMount() {
    
    this.setState({params: this.params})
    console.log(this.state.params)
    this.getDefaultVenues(this.params);
  }
  
  setCity = (city) => {
    const location = {lat: city.lat, lng: city.lng}
    console.log('city location', location)
    console.log('center',this.state.defaultCenter)
    this.setState({defaultCenter: location,
      userDidsearch:false
                  })
    console.log(this.state.defaultCenter)
    const params = {
      ll:[location.lat,location.lng].join(','),
      query: ''
    }
    this.setState({params})
    console.log(this.state.params)

    this.getDefaultVenues(params)

// const selectedCity = this.listOfCities.filter(city => city.id == cityId) 
// const cityLl = selectedCity[0].location;
// console.log(cityLl)
// this.params.ll = [this.state.defaultCenter.lat, this.state.defaultCenter.lng].join(','),
// this.getDefaultVenues();
  }

  getDefaultVenues = (params) => {
    FoursquareAPI.getAllVenues(params).then((response) => {
      response.sort(sortBy('name'))
      this.setState({ defaultMarkers: response,
                        venuesList:response.map((name,index)=>{return response[index].name}),
                        hasVenues:true
      })
    });

  }

  onToggleOpen = (venueId, location) => {
    const newLocation = {lat: location.lat, lng: location.lng}
    console.log(newLocation)
    this.setState({
      showInfoId: venueId,
    newCenter : newLocation,
    newZoom: 17,
    });
  };
  closeInfoWindow =() =>{
this.setState({
  newCenter: this.state.defaultCenter,
  newZoom : this.state.defaultZoom
})
  }
userDidSearch(searchedVenues, query) {
  this.setState({
searchedVenues,
searchQuery:query,
userDidSearch: true
  })
}
mapDraged(newCenter) {
  console.log('inside app map draged')
this.setState({newCenter})
}

  render() {
    const {userDidSearch, defaultMarkers, searchedVenues, searchQuery} = this.state
    return (
      <div className="App" role ="main">
        <header className="App-header">
          <h1 className="App-title">Neighborhood Map</h1>
        </header>
        <Search className="venues"
          defaultVenues={this.state.defaultMarkers}
          venuesList = {this.state.venuesList}
          query = {this.state.query } 
          params = {this.params}  
          defaultCenter = {this.state.defaultCenter} 
          hasVenues = {this.state.hasVenues}  
          onUserDidSearch = {this.userDidSearch}
          onToggleOpen = {this.onToggleOpen}
          listOfCities = {this.listOfCities}
          setCity = {this.setCity}
          />
        <Map role = "application" tabIndex ="0"
          searchedVenues={this.state.searchedVenues}
          defaultVenues={userDidSearch && searchQuery? searchedVenues : defaultMarkers }
          defaultCenter={this.state.newCenter}
          defaultZoom={this.state.newZoom}
          userDidsearch = {this.state.userDidSearch}
          listOpen ={this.state.listOpen}
          showInfoId = {this.state.showInfoId}
          onToggleOpen = {this.onToggleOpen}
          closeInfoWindow = {this.closeInfoWindow}
          mapDraged = {this.mapDraged}
        />
      </div>
    );
  }
}

export default App;
