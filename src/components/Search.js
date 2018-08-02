import React, {Component} from 'react'
import ReactDOM from 'react-dom';


// var foursquare = require('react-foursquare')({
//   clientID: 'C3FWNCOB31A0JJAQ321PP5IYZVTDCXPDPVQSYLD4EPFWYFYI',
//   clientSecret: 'NOTNZFMCB14R1JVE1JYPR13SJCQK1CJOPREN4E1SFDI3ZEW4'  
// });

// var params = {
//   "ll": "37.7749,-122.4194",
//   "query": 'Blue Bottle'
// };


export default class Search extends Component {

constructor(props) {
	super(props);
	this.state ={
		items: [],
		query :'',
		latitude : '37.773972', 
		longitude : '-122.431297'
}

}




componentDidMount() { 
let params = 	this.setParameters();
	console.log(params.limit)
   
	fetch(`https://api.foursquare.com/v2/venues/search?ll=${params.ll}&intent=${params.intent}&radius=${params.radius}&query=${params.query}&client_id=${params.client_id}&client_secret=${params.client_secret}&v=${params.v}`)
	.then(res => {
	console.log(res)
	})
	// .then(data => ({
	// 	venues: data.response.venues,
	// 	latitude: this.state.latitude,
	// 	longitude: this.state.latitude,
	// 	query: this.state.query,
	// }));
	
}


searchVenues(){
	// foursquare.venues.getVenues(this.state.params)
 //      .then(res=> {
 //        this.setState({ items: res.response.venues });
 //        console.log(this.state.items)
 //      });
}

handleSearch(event) {
	this.setState({
		query : event.target.value
	})
	console.log(this.state.query)
}


render() {
	return(
		<div>
			<input onChange = {this.handleSearch.bind(this)} type='text' placeholder ='search' />
			<button onClick = {this.searchVenues.bind(this)}>search</button>
			<ol>
				{/* {this.state.items} */}
			</ol>
		</div> 
		)

}
}