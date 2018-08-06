import React, {Component} from 'react'
import * as FoursquareAPI from '../FoursquareAPI'

export default class InfowindowContent extends Component {
constructor(props) {
    super(props)
    this.state = {
        currentMarker : this.props.currentMarker,
        markerPhoto:null
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
        const markerInfo = this.getMarkerInfo(markerId)
        // console.log(currentMarker)

        return  (
        <div>
            <h1>{currentMarker.name}</h1>
            <p>{currentMarker.location.formattedAddress}</p>
        </div>
        )

    }
}