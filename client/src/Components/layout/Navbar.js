import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

export const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { clearContacts } = contactContext;
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>
        {' '}
        <strong style={{ color: 'red' }}>Hola</strong> {user && user.name}
      </li>
      <li>
        <a onClick={onLogout} href='#!' className='fas fa-sign-out-alt'>
          {' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Registro</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-dark'>
      <h1>
        {' '}
        <i className={icon}></i> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
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
