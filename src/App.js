import React, { Component } from 'react';
import { MAP_API_KEY } from './credentials';
import { loadScript } from './utils/helpers';
import { getVenues } from './utils/api';
import './App.css';

class App extends Component {
  state = {
    venues: [],
    markers: [],
    query: '',
  };

  // get the venues from the api
  componentDidMount = () => {
    this.loadVenues();
  };

  // load the google maps script
  loadGoogleMaps = () => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&callback=initMap`
    );
    // connect the initMap() function to the global window context, so google maps can invoke it
    window.initMap = this.initMap;
  };

  // make api call and get the venues based on submitted parameters
  // map over the response (venues) and update the marker state
  // asynchronously load the Google Maps script
  loadVenues = () => {
    getVenues({
      near: 'Ubud',
      query: 'coffee',
      limit: 10,
    })
      .then(res => {
        const { venues } = res.data.response;
        this.setState({ venues }, this.loadGoogleMaps());
      })
      .catch(error => {
        console.log(error);
      });
  };

  initMap = () => {
    const { venues } = this.state;
    const markers = [];
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: venues[6].location.lat, lng: venues[6].location.lng },
      zoom: 14,
    });

    // initialize an infowindow for each marker and populate content
    const infowindow = new window.google.maps.InfoWindow();

    // map over the venues and display individual markers based on their lat and lng values
    // add an event listener to open/close the infowindow on click
    // update the markers state with the markers
    venues.map(v => {
      const contentString = `
      <p>${v.name}</p>
      `;
      const marker = new window.google.maps.Marker({
        position: { lat: v.location.lat, lng: v.location.lng },
        map,
        id: v.id,
        name: v.name,
        animation: window.google.maps.Animation.DROP,
      });

      // animate marker on click
      marker.addListener('click', () => {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker.setAnimation(null);
          }, 100);
        }
      });

      // open infowindow on marker click
      marker.addListener('click', () => {
        // set the content of the infowindow
        infowindow.setContent(contentString);
        // open infowindow
        infowindow.open(map, marker);
      });
      markers.push(marker);
      return marker;
    });
    this.setState({ markers });
  };

  // filter the list of markers based on the query input
  // toggle the marker's visibility to true or false based on the query
  filterList = query => {
    const { markers } = this.state;
    markers.filter(
      m =>
        m.name.toLowerCase().includes(query.toLowerCase())
          ? m.setVisible(true)
          : m.setVisible(false)
    );
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <div id="map" />
        <div id="sidebar">
          <input
            type="text"
            value={query}
            onChange={e => this.filterList(e.target.value)}
          />
        </div>
      </>
    );
  }
}

export default App;
