import axios from 'axios';
import { SQUARE_CLIENT_ID, SQUARE_CLIENT_SECRET } from '../credentials';

// TODO: Figure out which functions do not need to be exported and remove export
// TODO: Add error handling for the functions (specifically the api calls)

// foursquare and google maps api are both used for this project
// https://developer.foursquare.com/
// https://developers.google.com/maps/documentation/javascript/tutorial

export function mapBase() {
  return 'https://maps.googleapis.com/maps/api/js?v=3.exp&';
}

export function squareBase() {
  return 'https://api.foursquare.com/v2/venues/';
}

// takes in the required keys for the API request
// returns them assembled for the API request
// client_id=myClientID&client_secret=myClientSecret&v=20180910
export function squareAuth() {
  const keys = {
    client_id: SQUARE_CLIENT_ID,
    client_secret: SQUARE_CLIENT_SECRET,
    v: 20180910,
  };
  return Object.keys(keys)
    .map(k => `${k}=${keys[k]}`)
    .join('&');
}

// simple fetch api with no parameters included in the request
// will be used to fetch photos for the venue
export function squareSimpleFetch(endpoint) {
  return axios.get(`${squareBase()}${endpoint}?${squareAuth()}`);
}

// returns the params set for the search function
// i.e near=Ubud&query=food&limit=10
export function squareParams(urlParams) {
  return Object.keys(urlParams)
    .map(k => `${k}=${urlParams[k]}`)
    .join('&');
}

// api call with parameters included in the request
// i.e https://api.foursquare.com/v2/venues/search?client_id=myClientID&client_secret=myClientSecret&v=20180910&near=Ubud&query=food&limit=10
export function squareParamsFetch(endpoint, urlParams) {
  return axios.get(
    `${squareBase()}${endpoint}?${squareAuth()}&${squareParams(urlParams)}`
  );
}

// returns a list of venues near the current location
export function getVenues(urlParams) {
  return squareParamsFetch('search', urlParams);
}

// returns photos for a specific venue
export function getPhotos(VENUE_ID) {
  return squareSimpleFetch(`${VENUE_ID}/photos`);
}
