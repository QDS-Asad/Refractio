import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authLoginSelector } from '../features/auth/authLoginSlice';

const ProtectedRoute = ({ roles, children }) => {
  const { userLogin } = useSelector(authLoginSelector);
  if (roles.includes(userLogin.role.roleId)) {
    return children;
  } else {
    return <Navigate to='/forbidden' />;
  }
};

export default ProtectedRoute;
