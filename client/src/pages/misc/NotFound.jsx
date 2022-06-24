import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div id='misc'>
      <div className='misc'>
        <div className='misc-error'>
          <h1>404</h1>
        </div>
        <h2 className='primary-dark-color'>Page not found!</h2>
        <p className='primary-dark-color'>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link to='/' className='btn btn-outline'>
          Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
