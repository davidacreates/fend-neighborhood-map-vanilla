import React, { Component } from 'react';
import { loadGoogleMaps } from './utils/helpers';
import { getVenues } from './utils/api';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Map from './components/Map';
import './App.css';

class App extends Component {
  state = {
    query: '',
    sidebarOpen: false,
    filteredVenues: null,
  };

  // asynchronously load google maps using the promise created in the helper file
  // use promise.all to retrieve an array with (1) google the maps object and (2) the foursquare venue data
  // get the venues from the api
  componentDidMount = () => {
    const googleMapsPromise = loadGoogleMaps();
    const getVenuesPromise = getVenues({
      near: 'Ubud',
      query: 'coffee',
      limit: 10,
    });

    Promise.all([googleMapsPromise, getVenuesPromise])
      .then(values => {
        const google = values[0];
        this.venues = values[1].data.response.venues;

        // set google instance
        this.google = google;
        // set empty array to keep track of markers
        this.markers = [];
        // initialize an infowindow for each marker and populate content
        this.infowindow = new window.google.maps.InfoWindow();

        // create new google map
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: {
            lat: this.venues[6].location.lat,
            lng: this.venues[6].location.lng,
          },
          zoom: 14,
        });

        // iterate over the venues array and display individual markers for each venue based on their lat and lng values
        this.venues.forEach(v => {
          const contentString = `<p>${v.name}</p>`;
          const marker = new google.maps.Marker({
            position: { lat: v.location.lat, lng: v.location.lng },
            map: this.map,
            id: v.id,
            name: v.name,
            animation: google.maps.Animation.DROP,
          });
          // animate marker on click
          marker.addListener('click', () => {
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(this.google.maps.Animation.BOUNCE);
              setTimeout(() => {
                marker.setAnimation(null);
              }, 100);
            }
          });

          // open the infowindow on marker click
          // set the content for the infowindow
          // set zoom and center position based on clicked marker
          marker.addListener('click', () => {
            this.infowindow.setContent(contentString);
            this.infowindow.open(this.map, marker);
            this.map.setZoom(15);
          });
          // push the clicked marker to markers array
          this.markers.push(marker);
        });
        this.setState({ filteredVenues: this.venues });
      })
      .catch(error => {
        console.log(error);
        alert('Your page could not be loaded.');
      });
  };

  // use the filter method to find the marker that matches the venue id of the list item clicked
  // show info window for that marker
  handleVenueListItemClick = venue => {
    const marker = this.markers.filter(m => m.id === venue.id)[0];
    const contentString = `<p>${venue.name}</p>`;
    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, marker);
    this.map.setZoom(15);
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(this.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 100);
    }
  };

  // filter the list of markers and venue names based on the query input
  // toggle the marker's visibility to true or false based on the query
  // update the state for query and filteredVenues with the new data
  filterList = query => {
    const f = this.venues.filter(v =>
      v.name.toLowerCase().includes(query.toLowerCase())
    );
    this.markers.filter(
      m =>
        m.name.toLowerCase().includes(query.toLowerCase())
          ? m.setVisible(true)
          : m.setVisible(false)
    );
    this.setState({ filteredVenues: f, query });
  };

  // click handler to open and close the sidebar
  sidebarToggleClickHandler = () => {
    this.setState(prevState => ({ sidebarOpen: !prevState.sidebarOpen }));
  };

  // handle selecting list item when pressing the enter key
  keyEnter = (e, venue) => {
    if (e.key === 'Enter') {
      this.handleVenueListItemClick(venue);
    }
  };

  render() {
    const { filteredVenues, sidebarOpen } = this.state;
    let sidebar;

    if (sidebarOpen) {
      sidebar = (
        <Sidebar
          handleVenueListItemClick={this.handleVenueListItemClick}
          filterList={this.filterList}
          filteredVenues={filteredVenues}
          keyEnter={this.keyEnter}
        />
      );
    }
    return (
      <>
        <Navbar sidebarClickHandler={this.sidebarToggleClickHandler} />
        <main>
          {sidebar}
          <Map />
        </main>
      </>
    );
  }
}

export default App;
