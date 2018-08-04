const api = "https://api.foursquare.com/v2"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
	token = localStorage.token = Math.random().toString(36).substr(-8)

// const headers = {
//   'Accept': 'application/json',
//   'Authorization': token,
//   "Content-Type": "application/javascript"
// }


export const getAllVenues = (params) =>
	fetch(`https://api.foursquare.com/v2/venues/search?ll=${params.ll}&limit=${params.limit}&intent=${params.intent}&radius=${params.radius}&query=${params.query}&client_id=${params.client_id}&client_secret=${params.client_secret}&v=${params.v}`
	)
		.then(res => res.json())
		.then(data => data.response.venues);


// export const getVenuesInfo= (venueId) =>{
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
