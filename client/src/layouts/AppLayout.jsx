import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SideBar from '../components/Sidebar';
import { authLoginSelector } from '../features/auth/authLoginSlice';

const AppLayout = () => {
  // const { ROLES, USER_STATUS } = constants;
  const { loading, userLogin } = useSelector(authLoginSelector);

  if (!loading && !userLogin) {
    return <Navigate to='/auth/login' />;
  }

  if (userLogin && !userLogin.isVerified) {
    return <Navigate to='/auth/verify-code' />;
  }

  if (userLogin && userLogin.isRegistered) {
    return <Navigate to='/subscription' />;
  }

  if (userLogin && !userLogin.isRegistered && userLogin.role === undefined) {
    return <Navigate to='/workspaces' />;
  }

  return <SideBar />;
};

export default AppLayout;
