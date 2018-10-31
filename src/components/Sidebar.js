import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Sidebar extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    filteredVenues: PropTypes.array.isRequired,
    filterList: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired,
  };

  render() {
    const { query, filteredVenues, filterList, handleClick } = this.props;
    return (
      <div id="sidebar">
        <h1>
          <span role="img" aria-label="coffee cup">
            ☕
          </span>{' '}
          Brewing In Ubud
        </h1>
        <input
          type="text"
          placeholder="Filter Coffee Shops"
          value={query}
          onChange={e => filterList(e.target.value)}
        />
        {/* TODO: Make the filtered list accessible */}
        {filteredVenues &&
          filteredVenues.length > 0 &&
          filteredVenues.map((v, index) => (
            <div
              className="venueListItem"
              key={index}
              onClick={() => handleClick(v)}
            >
              {v.name}
            </div>
          ))}
      </div>
    );
  }
}
