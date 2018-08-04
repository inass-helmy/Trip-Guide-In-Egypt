import React, { Component } from 'react'
import ReactDOM from 'react-dom';

export default class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {
			defaultVenues: this.props.defaultVenues,
			venuesList : [],
			searchedVenues: {},
			query: '',
		}

	}

	componentDidMount() { 
		this.setState({venuesList:this.props.venuesList})
		console.log(this.props.venuesList)
		// console.log(this.props.venuesList)
	// let params = 	this.setParameters();
	// 	console.log(params.limit)

	// 	fetch(`https://api.foursquare.com/v2/venues/search?ll=${params.ll}&intent=${params.intent}&radius=${params.radius}&query=${params.query}&client_id=${params.client_id}&client_secret=${params.client_secret}&v=${params.v}`)
	// 	.then(res => {
	// 	console.log(res)
	// })
	// .then(data => ({
	// 	venues: data.response.venues,
	// 	latitude: this.state.latitude,
	// 	longitude: this.state.latitude,
	// 	query: this.state.query,
	// }));

	}


	// searchVenues(){
	// 	// foursquare.venues.getVenues(this.state.params)
	//  //      .then(res=> {
	//  //        this.setState({ items: res.response.venues });
	//  //        console.log(this.state.items)
	//  //      });
	// }

	handleSearch(event) {
		this.setState({
			query: event.target.value
		})
		console.log(this.state.query);
		console.log(this.state.venuesList)
	}


	render() {
		return (
			<div>
				<input className = 'input-field'
				onChange={this.handleSearch.bind(this)} type='text' 
				placeholder='search' />
				<button className = 'search-button'
				// onClick = {this.searchVenues.bind(this)}
				>search</button>
				<ul className = 'venues'>
				{this.props.defaultVenues.map((venue)=>{
						return( <li>{venue.name}</li>)
				})
			}
				</ul>
			</div>
		)

	}
}