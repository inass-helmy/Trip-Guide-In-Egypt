import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'
import * as FoursquareAPI from '../FoursquareAPI'

export default class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchedVenues: [],
			venuesList : [],
			hasVenues : false,
			// searchedVenues: {},
			query: '',
		}
		this.searchVenues = this.searchVenues.bind(this)
	}

	componentWillMount() { 
		this.setState({searchedVenues: this.props.defaultVenues,
			venuesList : this.props.venuesList})
		console.log(this.state.searchedVenues)

	}
	updateQuery = (query) => {
		this.setState({query});
	   const result = this.searchVenues(query);
	   this.setState({searchedVenues : result.filteredVenues});
	   console.log(this.state.searchedVenues)

	}


	searchVenues(query){
		let filteredVenues
		let venues = this.props.defaultVenues
		let hasVenues = false 
		let result ={}
		if(venues !== undefined && venues !== null && venues.length > 0) {
			hasVenues = true;
			this.setState({hasVenues})
			venues.sort(sortBy('name'))
		}
		if (query) {
		const match = new RegExp(escapeRegExp(query.trim()), 'i')
		if (hasVenues) {
				filteredVenues = venues.filter((venue) => match.test((venue.name)))
		}	
		} else {
				filteredVenues = venues
		}

		result = {hasVenues :hasVenues	, filteredVenues: filteredVenues}
		// console.log(result.filteredVenues)	
		return result

		this.setState({searchedVenues: result.filteredVenues})
		console.log(this.state.searchedVenues)
		console.log(query)
	}


	render() {
		const {defaultVenues} = this.props;
		const {searchedVenues, hasVenues} = this.state;
		const displayVenues = hasVenues? searchedVenues : defaultVenues;


		return (
			<div>
				<input className = 'input-field'
				value={this.state.query}
				onChange={((event) => this.updateQuery(event.target.value))}
				// onChange={this.handleSearch.bind(this)} type='text' 
				placeholder='I am looking for' />
				<button className = 'search-button'
				// onClick = {this.searchVenues.bind(this)}
				>in cairo</button>
				<ul className = 'venues'>
				{displayVenues.map((venue)=>{
						return( <li key ={venue.id} >{venue.name}</li>)
				})
			}
				</ul>
			</div>
		)

	}
}