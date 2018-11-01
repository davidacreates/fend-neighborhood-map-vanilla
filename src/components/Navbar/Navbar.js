import React from 'react';
import PropTypes from 'prop-types';
import SidebarToggle from '../Sidebar/SidebarToggle';
import './Navbar.css';

const Navbar = props => {
  const { sidebarClickHandler } = props;
  return (
    <header className="navbar">
      <nav className="nav">
        <div>
          <SidebarToggle click={sidebarClickHandler} />
        </div>
        <div className="nav__logo">
          <h1 className="nav__title">
            <span role="img" aria-label="coffee cup">
              ☕
            </span>
            Brewing In Ubud
          </h1>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

Navbar.propTypes = {
  sidebarClickHandler: PropTypes.func,
};
