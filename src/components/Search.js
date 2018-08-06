import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'
import * as FoursquareAPI from '../FoursquareAPI'

export default class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {
			deaultVenues: this.props.defaultVenues,
			venuesList : this.props.venuesList,
			searchedVenues: [],
			hasVenues : false,
			query: '',
			userDidSearch: this.props.userDidSearch
		}
		this.searchVenues = this.searchVenues.bind(this)
	}
	updateQuery = (query) => {

		this.setState({query});
	   const result = this.searchVenues(query);		
	}

	searchVenues(query){
		const searchParams = this.props.params;
		searchParams.query = this.state.query;
		FoursquareAPI.getAllVenues(searchParams).then((response) => {
			this.props.onUserDidSearch(response, query)
			response.sort(sortBy('name'))
			this.setState({ searchedVenues: response,
							  venuesList:response.map((name,index)=>{return response[index].name}),
							  hasVenues:true,
							  userDidSearch: true
			})
		  });
	}
	handleClickElement(event, venueId, location) {
		this.props.onToggleOpen(venueId, location)
	}
	render() {
		const {defaultVenues} = this.props;
		const {searchedVenues, userDidSearch,query} = this.state;
		const displayVenues = userDidSearch&&query? searchedVenues : defaultVenues;
		console.log(displayVenues)
		return (
			<div>
				<input className = 'input-field'
				value={this.state.query}
				onChange={((event) => this.updateQuery(event.target.value))}
				type='text'
				placeholder='I am looking for' />
				<button className = 'search-button'
				>in cairo</button>
				<ul className = 'venues'>
				{displayVenues.map((venue)=>{
						return( <li 
							key ={venue.id} 
						    onClick ={(event) => this.handleClickElement(event,venue.id,venue.location)}>{venue.name}</li>)
				})
			}
				</ul>
			</div>
		)

	}
}