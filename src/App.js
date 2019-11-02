
import React, { Component } from 'react';
import Map from './components/Map'
import Search from './components/Search'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'
import * as FoursquareAPI from './FoursquareAPI'

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      defaultMarkers: [],
      defaultCenter: { lat: 30.0444196, lng: 31.2357116 },
      defaultZoom: 13,
      newCenter: { lat: 30.0444196, lng: 31.2357116 },
      newZoom: 13,
      veneusList: [],
      showInfoId: null,
      hasVenues: false,
      userDidSearch: false,
      searchQuery: '',
      listOpen: null,
      searchedVenues: [],
      params: {},
      city: 'Cairo',
      barsShow: 'hidden'
    }
    this.params = {
      ll: [this.state.defaultCenter.lat, this.state.defaultCenter.lng].join(','),
      query: this.state.searchQuery
    }
    this.updateQuery = this.updateQuery.bind(this)
  }
  componentDidMount() {
    this.setState({ params: this.params })
    this.getDefaultVenues(this.params);
  }

  setCity = (location, name) => {
    this.closeInfoWindow()
    console.log('city location', location)
    let params = this.params;
    params.ll = [location.lat, location.lng].join(',');
    this.setState({
      defaultCenter: location,
      newCenter: location,
      city: name,
      params,
    })
    this.getDefaultVenues(params)
  }

  updateQuery(query) {
    if (query == '') {
      this.clearQuery()
    } else {
      const match = new RegExp(escapeRegExp(query.trim()), 'i')
      const params = this.params;
      params.query = match
      this.setState({
        searchQuery: query,
        userDidSearch: true,
        params
      });
      this.getDefaultVenues(params)
    }
  }

  clearQuery() {
    const params = this.params
    params.query = ''
    this.setState({
      userDidsearch: false,
      searchQuery: '',
      params
    })
    this.getDefaultVenues(params)
  }

  getDefaultVenues = (params) => {
    FoursquareAPI.getAllVenues(params).then((response) => {
      const { userDidSearch, searchQuery } = this.state
      response.sort(sortBy('name'))
      if (userDidSearch && searchQuery) {
        this.setState({
          searchedVenues: response,
          venuesList: response.map((name, index) => { return response[index].name }),
          hasVenues: true
        })
      } else {
        this.setState({
          defaultMarkers: response,
          venuesList: response.map((name, index) => { return response[index].name }),
          hasVenues: true
        })
      }

    });

  }

  onToggleOpen = (venueId, location) => {
    const newLocation = { lat: location.lat, lng: location.lng }
    console.log(newLocation)
    this.setState({
      showInfoId: venueId,
      newCenter: newLocation,
      newZoom: 16,
    });
  };
  closeInfoWindow = () => {
    this.setState({
      newCenter: this.state.defaultCenter,
      newZoom: this.state.defaultZoom,
      showInfoId: null
    })
  }
  toggleBars() {
    let cssClass = (this.state.barsShow === 'show') ? 'hidden' : 'show';
    this.setState({ barsShow: cssClass })
  }

  render() {
    const { userDidSearch, defaultMarkers, searchedVenues, searchQuery } = this.state
    return (
      <div className="App" role="main">
        <header className="App-header">

          <h1 className="App-title"><span className='bars' onClick={this.toggleBars.bind(this)} aria-labeL="open search menu" tabIndex="0"></span>
            Trip Guide In Egypt</h1>

        </header>

        <Search className='venues'
          defaultVenues={this.state.defaultMarkers}
          venuesList={this.state.venuesList}
          query={this.state.query}
          params={this.state.params}
          defaultCenter={this.state.defaultCenter}
          hasVenues={this.state.hasVenues}
          onToggleOpen={this.onToggleOpen}
          listOfCities={this.listOfCities}
          setCity={this.setCity}
          city={this.state.city}
          searchQuery={this.state.searchQuery}
          displayVenues={userDidSearch && searchQuery ? searchedVenues : defaultMarkers}
          searchedVenues={this.state.searchedVenues}
          searchVenues={this.searchVenues}
          updateQuery={this.updateQuery}
          barsShow={this.state.barsShow}
        />
        <Map role="application" tabIndex="0"
          searchedVenues={this.state.searchedVenues}
          defaultVenues={userDidSearch && searchQuery ? searchedVenues : defaultMarkers}
          defaultCenter={this.state.newCenter}
          defaultZoom={this.state.newZoom}
          userDidsearch={this.state.userDidSearch}
          listOpen={this.state.listOpen}
          showInfoId={this.state.showInfoId}
          onToggleOpen={this.onToggleOpen}
          closeInfoWindow={this.closeInfoWindow}
          mapDraged={this.mapDraged}
        />
        <footer className="App-footer">Created By @Enas Samir, Integrated with Google-Maps and Foursquare API's</footer>
      </div>
    );
  }
}

export default App;