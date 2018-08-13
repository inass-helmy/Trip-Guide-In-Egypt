import React, {Component} from 'react'
import * as FoursquareAPI from '../FoursquareAPI'

export default class InfowindowContent extends Component {
constructor(props) {
    super(props)
    this.state = {
        currentMarker : this.props.currentMarker,
        markerPhoto:null,
        markerInfo:null
    }
}

getMarkerInfo(markerId) {
    FoursquareAPI.getInfoContent(markerId)
        .then(response=>{
            if(response ===undefined) {
                console.log('venues detailed failed')
            }
            return response
        })
        .then(response =>{
            console.log(response)
            this.setState({
                markerInfo: response
            })
            return response;
        })

    //    FoursquareAPI.getVenuePhoto(markerId)
    //     .then(response=>{
    //         if(response ===undefined) {
    //             console.log('no photos for this location')
    //         }
    //         return response
    //     })
    //     .then(response =>{
    //         console.log(response)
    //         this.setState({
    //             markerPhoto: response
    //         })
    //         return response;
    //     })

}
    render() {
        const markerId = this.state.currentMarker.id
        const {currentMarker} = this.state
        let locationAddress = currentMarker.location.formattedAddress
        return  (
        <div tabIndex = "0" aria-label="Info window">
            <h2 tabIndex = "0">{currentMarker.name}</h2>
            <div>
                {locationAddress.map((address,key) => {
            return <div className ="marker-address" key={key}>{address}</div>
        })}
            </div>
        </div>
        )

    }
}