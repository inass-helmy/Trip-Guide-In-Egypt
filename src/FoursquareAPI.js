import { client_id, client_secret } from './credentials';

const api = 'https://api.foursquare.com/v2';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const auths = {
  limit: 50,
  intent: 'browse',
  radius: '5000',
  client_id,
  client_secret,
  version: '20180802'
};
//adding categories id for the search request from foursquare as following: entertainment, museum, food,nightLife spot and hotel

const categories = {
  entertainment: '4d4b7104d754a06370d81259',
  museum: '4bf58dd8d48988d181941735',
  food: '4d4b7105d754a06374d81259',
  nightlifeSpot: '4d4b7105d754a06376d81259',
  hotel: '4bf58dd8d48988d1fa931735'
};
const categories_id = Object.keys(categories).map(item => categories[item]);

export const getAllVenues = params =>
  fetch(
    `${api}/venues/search?ll=${params.ll}&limit=${auths.limit}&intent=${auths.intent}&radius=${auths.radius}&&categoryId=${categories_id}&query=${params.query}&client_id=${auths.client_id}&client_secret=${auths.client_secret}&v=${auths.version}`
  )
    .then(res => res.json())
    .then(data => data.response.venues);

export const getInfoContent = venueId => {
  return fetch(
    `${api}/venues/${venueId}?client_id=${auths.client_id}&client_secret=${auths.client_secret}&v=${auths.version}`
  ).then(response => {
    if (!response.ok) {
      throw response;
    } else return response.json();
  });
};

export const getVenuePhoto = venueId => {
  return fetch(
    `${api}/venues/${venueId}/photos?client_id=${auths.client_id}&client_secret=${auths.client_secret}&v=${auths.version}`
  ).then(response => {
    if (!response.ok) {
      throw response;
    } else return response.json();
  });
};
