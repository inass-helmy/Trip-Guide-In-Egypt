import React, { Component } from "react";
import InfowindowContent from "./InfowindowContent";
class Map extends Component {
  constructor(props) {
    super(props);
    // this.onToggleOpen = this.onToggleOpen.bind(this);
    

    this.state = {
      map: null,
      center: this.props.defaultCenter,
      newCneter: this.props.defaultCenter,
      mapDragged:false,
      zoom: this.props.defaultZoom,
      listOpen: this.props.listOpen, 
    };
  }
  
  // onToggleOpen = (venueId, location) => {
  //   this.setState({
  //     showInfoIndex: venueId,
  //     center: location,
  //     zoom: 19
  //   });
  //   console.log('inside map toggle',this.state.showInfoIndex)
  // };
  render() {
    const {
      compose,
      withState,
      withHandlers,
    } = require("recompose");
    const {
      withScriptjs,
      withGoogleMap,
      GoogleMap,
      Marker,
      InfoWindow
    } = require("react-google-maps");

    const MapWithAMarker = compose(
      withState("zoom", "onZoomChange", this.state.zoom),
      withState("center", 'onmapMoved', this.state.center),
      withHandlers(() => {
        const refs = {
          map: undefined
        };

        return {
          onMapMounted: () => ref => {
            refs.map = ref;
            if (this.state.map != null)return;
            this.setState({ map: refs.map });
          },
          onZoomChanged: ({ onZoomChange }) => () => {
             onZoomChange(refs.map.getZoom());
          },
          onmapMoved: ()=> ref => {
            let newCenter = JSON.stringify(refs.map.getCenter());
            this.setState({newCenter,
                            mapDragged: true})
          }
        };
      }),

      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
      ref={props.onMapMounted}
      onDragEnd = {props.onmapMoved}
      onZoomChanged={props.onZoomChanged}
      onmapMoved={props.onmapMoved}
      defaultCenter= {props.center}
      defaultZoom={props.zoom}
      >
        {props.Markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              position={marker.location}
              name={marker.name}
              id ={marker.id}
              animation = {window.google.maps.Animation.DROP}
              onClick={() => {
                this.setState({center:this.props.newCenter,
                  zoom: this.props.newZoom,
                  })
                this.props.onToggleOpen(marker.id, marker.location, this.state.infowindowClose);
                
                console.log('props', props)

              }}
            >
              {this.props.showInfoIndex == marker.id && !marker.showInfo &&(
                <InfoWindow
                  onCloseClick={() => {
                    marker.showInfo =true
                    console.log('marker closed')
                    this.setState({
                      center: this.props.defaultCenter,
                      zoom: this.props.defaultZoom,
                    });
                    console.log(this.props.infowindowClose)
                  }}
                >
                <InfowindowContent currentMarker ={marker}/>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    ));
    return (
      <div>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIQoUyP_jwbeWXoSNcqLPTSdaufshgIDY"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `650px` }} />}
          mapElement={<div style={{ height: `100%`, width:'70%', float: 'right'}} />}
          zoom={this.state.zoom}
          center={this.state.center}
          Markers={this.props.defaultVenues}
          selectedPlace={this.state.selectedPlace}
          onClick={this.onToggleOPen}
        />
      </div>
    );
  }
}
export default Map;