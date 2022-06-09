import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';

const SubscriptionLayout = () => {
  return (
    <>
      <NavBar showLogo />
      <Outlet />
    </>
  );
};

export default SubscriptionLayout;
