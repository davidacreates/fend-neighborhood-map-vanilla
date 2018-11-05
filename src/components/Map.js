import React, { Component } from 'react';

export default class Map extends Component {
  render() {
    return (
      <>
        <div
          role="application"
          id="map"
          aria-hidden="true"
          tabIndex="-1"
          style={{ position: 'relative' }}
        />
      </>
    );
  }
}
