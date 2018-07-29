import React, { Component } from 'react';
// import { withGoogleMap, GoogleMap } from 'react-google-maps';
// import { Marker, InfoWindow } from "react-google-maps";
class Map extends Component {
  render() {
    var markers = [];

    var locations = [
  {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
  {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
  {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
  {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
  {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
  {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}},

  ];
    const { compose, withProps,
    withStateHandlers } = require("recompose");
    const {
      withScriptjs,
      withGoogleMap,
      GoogleMap,
      Marker,
      InfoWindow
    } = require("react-google-maps");

    const MapWithAMarker = compose(
      withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        defaultZoom={13}
      >
        <Marker
          position={{ lat: 40.756795, lng: -73.954298 }}
          onClick ={props.onToggleOpen}
        >
        {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        <p>Hi</p>
      </InfoWindow>}

        </Marker>
      </GoogleMap>
    );
    return (
      <div>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIQoUyP_jwbeWXoSNcqLPTSdaufshgIDY&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
};
export default Map;