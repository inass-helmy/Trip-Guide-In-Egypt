import React, { Component } from 'react';
class Map extends Component {

constructor (props) {
  super(props);
  this.onToggleOpen = this.onToggleOpen.bind(this)
  
  this.state = {
    map :null,
    center: {lat: 40.7413549, lng: -73.9980244},
    zoom:13,
    Markers : [],
    showInfoIndex: null
  }
}
componentDidMount = ()=> {
this.setState({ Markers: [
              {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
              {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
              {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
              {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
              {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
              {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}},

                ] })
}
  
onToggleOpen =(index, location) => {
  this.setState({showInfoIndex : index,
                  center: location})
                  console.log(this.state.center)
}
mapMoved = ()=>{
  console.log('mapMpved '+ JSON.stringify(this.state.map.getCenter()))
}
mapLoaded = (map)=> {
  console.log('maploaded')
    if (this.state.map !== null) 

      return

      this.setState({
        map:map
      })

}

  render() {

    const { compose, withProps, withState,withHandlers,
    withStateHandlers } = require("recompose");
    const {
      withScriptjs,
      withGoogleMap,
      GoogleMap,
      Marker,
      InfoWindow
    } = require("react-google-maps");

    const MapWithAMarker = compose(
      withState('zoom', 'onZoomChange', 13),
      withHandlers(() => {
    const refs = {
      map: undefined,
    }

    return {
      onMapMounted: () => ref => {
        refs.map = ref;
        if(this.state.map != null)
          return
        this.setState({map:ref})
      },
      onZoomChanged: ({ onZoomChange }) => () => {
        onZoomChange(refs.map.getZoom())
      }
    }
  }),
  
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
      ref={props.onMapMounted}
      onDragEnd = {this.mapMoved.bind(this)}
      onZoomChanged={props.onZoomChanged}
        defaultCenter= {this.state.center}
        defaultZoom={this.state.zoom}
      >

       { props.Markers.map((marker, index)=> {
      return (
        <Marker 
          key = {index}
          position={marker.location}
          title={marker.title}
          onClick ={()=> {
            this.onToggleOpen(index, marker.location)
          }}
        >
        { this.state.showInfoIndex== index && 
        <InfoWindow 
        onCloseClick = {()=>{
          this.setState({center:{lat: 40.7413549, lng: -73.9980244},
                          showInfoIndex : null})
                          console.log(props.defaultCenter)
        }} >
        <p>{marker.title}</p>
      </InfoWindow>
      }

        </Marker>
         )
    })}
      </GoogleMap>
    );
    return (
      <div>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIQoUyP_jwbeWXoSNcqLPTSdaufshgIDY&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `650px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          zoom = {this.state.zoom}
          center = {this.state.center}
          Markers = {this.state.Markers}
          selectedPlace = {this.state.selectedPlace}
          onClick = {this.onToggleOPen}
        />
      </div>
    );
  }
};
export default Map;