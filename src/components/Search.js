import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'
import {listOfCities} from '../listOfCities'

export default class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {
			deaultVenues: this.props.defaultVenues,
			venuesList : this.props.venuesList,
			searchedVenues: this.props.searchedVenues,
			hasVenues : false,
			query: this.props.searchQuery,
			userDidSearch: this.props.userDidSearch,
			city : this.props.city,
		}
	}

	render() {
		const {displayVenues} = this.props;
		return (
			<div className = 'list-container'>
				<div >
				<input className = 'input-field' role="textbox" aria-label = "Enter category or venue name"
				value={this.props.searchQuery}
				onChange={((event) => this.props.updateQuery(event.target.value))}
				type='text'
				placeholder='   I am looking for...' />
				<div className = 'dropdown'>
				<button className = 'dropbtn'><span>In </span>{this.props.city}</button>
					<div className = 'dropdown-content'  >
					{listOfCities.map((city)=>{
						return(<a href= "#" key = {city.id}
						role="menu item"
						onClick ={(event) => this.props.setCity(city.location, city.name)}>{city.name}</a>)
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