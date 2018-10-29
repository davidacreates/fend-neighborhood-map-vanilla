import React, { Component } from 'react';
import { MAP_API_KEY } from './credentials';
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
  // load the map and bind initMap function to the window object
  componentDidMount = () => {
    this.loadMap();
    window.initMap = this.initMap;
  };

  loadMap = () => {
    loadJS(
      `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&callback=initMap`
    );
  };

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
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
