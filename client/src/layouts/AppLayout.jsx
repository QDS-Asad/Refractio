import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SideBar from '../components/Sidebar';
import { authLoginSelector } from '../features/auth/authLoginSlice';
//import constants from '../common/constants';

const AppLayout = () => {
  // const { ROLES, USER_STATUS } = constants;
  const { loading, userLogin } = useSelector(authLoginSelector);

  if (!loading && !userLogin) {
    return <Navigate to='/auth/login' />;
  }

  if (userLogin && !userLogin.isVerified) {
    return <Navigate to='/auth/verify-code' />;
  }

  // TODO: This will be uncommented as will complete subscription screen
  // if (
  //   userLogin &&
  //   userLogin.role &&
  //   userLogin.role.roleId === ROLES.ADMIN &&
  //   userLogin.status === USER_STATUS.SUBSCRIPTION_PENDING
  // ) {
  //   return <Navigate to='/subscription' />;
  // }

  return <SideBar />;
};

export default AppLayout;
