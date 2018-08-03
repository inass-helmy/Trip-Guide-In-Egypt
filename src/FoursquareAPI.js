const api = "https://api.foursquare.com/v2"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

// const headers = {
//   'Accept': 'application/json',
//   'Authorization': token,
//   "Content-Type": "text/plain"
// }
// export const setParameters = ()=> {
// 	const params = {
// 		v: '20180802',
// 		ll: ['37.773972','-122.431297'].join(','),
// 		query:'Blue Bottle',
// 		limit: 8,
// 		intent: 'browse',
// 		radius: '1000',
// 		client_id: 'C3FWNCOB31A0JJAQ321PP5IYZVTDCXPDPVQSYLD4EPFWYFYI',
// 		client_secret: 'NOTNZFMCB14R1JVE1JYPR13SJCQK1CJOPREN4E1SFDI3ZEW4',
// 	};
// 	return params;
// }
// let params =setParameters();
// let center = {lat: 40.7413549, lng: -73.9980244};

export const getAllVenues = (params) =>
fetch(`https://api.foursquare.com/v2/venues/search?ll=${params.ll}&intent=${params.intent}&radius=${params.radius}&query=${params.query}&client_id=${params.client_id}&client_secret=${params.client_secret}&v=${params.v}`
)
    .then(res => res.json())
    .then(data => data.response.venues);


// export const getVemuesInfo= (venueId) =>{
// let venueSearchResult = [`/venues/${venueId}?`,`client_id=${params.client_id}`,`&client_secret=${params.client_secret}`].join('')
//   return fetch(`${api}${venueSearchResult}`)
//     .then(res => res.json())
//     .then(data => data.response.venue)
// }

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json())

// export const search = (query) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query })
//   }).then(res => res.json())
//     .then(data => data.books)
