import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SideBar from '../components/Sidebar';
import { authLoginSelector } from '../features/auth/authLoginSlice';

const AppLayout = () => {
  const { loading, userLogin } = useSelector(authLoginSelector);

  if (!loading && !userLogin) {
    return <Navigate to='/auth/login' />;
  }

  if (userLogin && !userLogin.verified) {
    return <Navigate to='/auth/verify-code' />;
  }

  return <SideBar />;
};

export default AppLayout;
