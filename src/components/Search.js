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
			userDidSearch: this.props.userDidSearch,
			listOfCities : this.props.listOfCities,
			city : 'Cairo',
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
	selectCity(city) {
	this.setState({query:'',
		city:city.name})
	this.props.setCity(city.location)
	}
	render() {
		const {defaultVenues} = this.props;
		const {searchedVenues, userDidSearch,query} = this.state;
		const displayVenues = userDidSearch&&query? searchedVenues : defaultVenues;
		return (
			<div className = 'list-container'>
				<div >
				<input className = 'input-field' role="textbox" aria-label = "Enter category or venue name"
				value={this.state.query}
				onChange={((event) => this.updateQuery(event.target.value))}
				type='text'
				placeholder='   I am looking for...' />
				<div className = 'dropdown'>
				<button className = 'dropbtn'><span>In </span>{this.state.city}</button>
					<div className = 'dropdown-content'  >
					{this.props.listOfCities.map((city)=>{
						return(<a href= "#" key = {city.id}
						role="menu item"
						onClick ={(event) => this.selectCity(city)}>{city.name}</a>)

					})}
					</div>
				</div>
				</div>
				<ul className = 'venues'
				role ="menu"
				arial-label="List of neighbourhood venues">
				{displayVenues.map((venue)=>{
						return( <li className="list-item" role="menu item"
							key ={venue.id} 
						    onClick ={(event) => this.props.onToggleOpen(venue.id, venue.location)}>{venue.name}</li>)
				})
			}
				</ul>
			</div>
		)

	}
}