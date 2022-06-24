import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div id='misc'>
      <div className='misc'>
        <div className='misc-error'>
          <h1>403</h1>
        </div>
        <h2 className='primary-dark-color'>Page forbidden!</h2>
        <p className='primary-dark-color'>
          We're sorry, you don't have access to the page you requested.
        </p>
        <Link to='/' className='btn btn-outline'>
          Home Page
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
