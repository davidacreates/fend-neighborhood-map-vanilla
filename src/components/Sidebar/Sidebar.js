import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

export default class Sidebar extends Component {
  static propTypes = {
    query: PropTypes.string,
    filteredVenues: PropTypes.array,
    filterList: PropTypes.func.isRequired,
    handleVenueListItemClick: PropTypes.func.isRequired,
    keyEnter: PropTypes.func,
  };

  render() {
    const {
      query,
      filteredVenues,
      filterList,
      handleVenueListItemClick,
      keyEnter,
    } = this.props;
    return (
      <>
        <div id="sidebar">
          <input
            type="text"
            placeholder="Filter Coffee Shops"
            value={query}
            onChange={e => filterList(e.target.value)}
          />

          {filteredVenues &&
            filteredVenues.length > 0 &&
            filteredVenues.map((v, index) => (
              <div
                role="button"
                className="venue-item"
                key={index}
                onClick={() => handleVenueListItemClick(v)}
                onKeyPress={e => keyEnter(e, v)}
                tabIndex="0"
              >
                {v.name}
              </div>
            ))}
        </div>
      </>
    );
  }
}
