import React from 'react';
import PropTypes from 'prop-types';
import './SidebarToggle.css';

const SidebarToggle = props => {
  const { click } = props;
  return (
    <button className="sidebar-toggle" type="button" onClick={click}>
      <div className="sidebar-toggle__line" />
      <div className="sidebar-toggle__line" />
      <div className="sidebar-toggle__line" />
    </button>
  );
};

SidebarToggle.propTypes = {
  click: PropTypes.func,
};

export default SidebarToggle;
