import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Navbar = ({ title, icon }) => {
  return (
    <div className='navbar bg-dark'>
      <h1>
        {' '}
        <i className={icon}></i> {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>Acerca de esta App</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.protoTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};
