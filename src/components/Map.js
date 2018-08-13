import React, { Component } from "react";
import InfowindowContent from "./InfowindowContent";
import { lifecycle } from "recompose";
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      center: this.props.defaultCenter,
      newCenter:this.props.newCenter,
      mapDragged:false,
      zoom: this.props.defaultZoom,
      listOpen: this.props.listOpen,
    };
  }
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
      withState("zoom", "onZoomChange", this.props.defaultZoom),
      withState("center", 'onmapMoved', this.props.defaultCenter),
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
             const newZoom = onZoomChange(refs.map.getZoom());
             this.setState({zoom: newZoom})
          },
        };
      }),
      lifecycle({
        componenetDidMount(){
            const bounds = new window.google.maps.LatLngBounds();

                this.state.map.props.children.forEach((child) => {
                    console.log(child.type)
                    if (child.type === Marker) {
                        bounds.extend(new window.google.maps.LatLng(child.props.position.lat, child.props.position.lng));
                    }
                })
                this.state.map.fitBounds(bounds);  
            },

        componentDidCatch(error, info) {
                console.log(error)
                alert("Error Occured while trying to render google maps API Please check your credentials")
            }
      }),

      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
      ref={props.onMapMounted}
      onZoomChanged={props.onZoomChanged}
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
                console.log('marker clicked')
                console.log(marker)
                const location = {lat: marker.location.lat, lng: marker.location.lng} 
                console.log(location)
                this.props.onToggleOpen(marker.id, location);
                console.log(location)                
              }}
            >
              {this.props.showInfoId == marker.id && !marker.showInfo &&(
                <InfoWindow
                  onCloseClick={() => {
                    this.props.closeInfoWindow()
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
          mapElement={<div className = "map-element" />}
          Markers={this.props.defaultVenues}
          center = {this.props.defaultCenter}
          zoom = {this.props.defaultZoom}
        />
      </div>
    );
  }
}
export default Map;