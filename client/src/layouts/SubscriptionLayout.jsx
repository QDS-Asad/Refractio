import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { authLoginSelector } from '../features/auth/authLoginSlice';

const SubscriptionLayout = () => {
  const { loading, userLogin } = useSelector(authLoginSelector);

  if (!loading && !userLogin) {
    return <Navigate to='/auth/login' />;
  }
  return (
    <>
      <NavBar showLogo />
      <Outlet />
    </>
  );
};

export default SubscriptionLayout;
