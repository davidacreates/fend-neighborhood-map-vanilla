import axios from 'axios';
import { SQUARE_CLIENT_ID, SQUARE_CLIENT_SECRET } from '../credentials';

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
