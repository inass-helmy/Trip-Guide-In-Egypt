import React, { Component } from "react";
class Map extends Component {
  constructor(props) {
    super(props);
    this.onToggleOpen = this.onToggleOpen.bind(this);
    

    this.state = {
      map: null,
      Markers: [],
      showInfoIndex: null,
      center: this.props.defaultCenter,
      newCneter: this.props.defaultCenter,
      mapDragged:false,
      zoom: this.props.defaultZoom
    };
  }
  componentDidMount = () => {
    this.setState({ Markers: this.props.defaultVenues });
  };

  onToggleOpen = (index, location) => {
    this.setState({
      showInfoIndex: index,
      center: location,
      zoom: 17
    });
  };
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
      withState("zoom", "onZoomChange", this.state.zoom,"center", 'onmapMoved', this.state.center),
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
              onClick={() => {
                this.onToggleOpen(index, marker.location);
              }}
            >
              {this.state.showInfoIndex == index && (
                <InfoWindow
                  onCloseClick={() => {
                    this.setState({
                      center: this.props.defaultCenter,
                      zoom: this.props.defaultZoom,
                      showInfoIndex: null
                    });
                  }}
                >
                  <p>{marker.name}</p>
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
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIQoUyP_jwbeWXoSNcqLPTSdaufshgIDY&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `650px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
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
