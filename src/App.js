import React, { Component } from 'react';
import { MAP_API_KEY } from './credentials';
import { searchVenues, DEFAULT_CENTER, DEFAULT_ZOOM } from './api';
import './App.css';

// load google maps script
// reference: https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
function loadJS(url) {
  const ref = window.document.getElementsByTagName('script')[1];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  ref.parentNode.insertBefore(script, ref);
}

class App extends Component {
  state = {
    venues: [],
  };

  // get the venues from the api
  componentDidMount = () => {
    this.getVenues();
  };

  // load the google maps script
  loadMap = () => {
    loadJS(
      `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&callback=initMap`
    );
    // connect the initMap() function to the global window context, so google maps can invoke it
    window.initMap = this.initMap;
  };

  // make api call and get the venues based on submitted parameters
  // map over the response (venues) and update the marker state
  // asynchronously load the Google Maps script
  getVenues = () => {
    searchVenues({
      near: 'Ubud',
      query: 'coffee',
      limit: 10,
    })
      .then(res => {
        const { venues } = res.data.response;
        this.setState({ venues }, this.loadMap());
      })
      .catch(error => {
        console.log(error);
      });
  };

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    });

    // initialize an infowindow for each marker and populate content
    const infowindow = new window.google.maps.InfoWindow();

    // map over the venues and display individual markers based on their lat and lng values
    // add an event listener to open/close the infowindow on click
    const { venues } = this.state;
    venues.map(v => {
      const contentString = `${v.name}`;
      const marker = new window.google.maps.Marker({
        position: { lat: v.location.lat, lng: v.location.lng },
        map,
      });
      marker.addListener('click', () => {
        // set the content of the infowindow
        infowindow.setContent(contentString);
        // open infowindow
        infowindow.open(map, marker);
      });
      return marker;
    });
  };

  render() {
    return (
      <>
        <div id="map" />
      </>
    );
  }
}

export default App;
