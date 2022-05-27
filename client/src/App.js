import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import InviteAccount from './pages/auth/InviteAccount';
import VerificationCode from './pages/auth/VerificationCode';
import PasswordRecover from './pages/auth/PasswordRecover';
import NewPassword from './pages/auth/NewPassword';
import Auth from './pages/auth/Auth';
import AppLayout from './layouts/AppLayout';
import Opportunities from './pages/app/Opportunities/Opportunities';
const App = () => {
  return (
    <Routes>
      <Route path='auth' element={<Auth />}>
        <Route path='' element={<Navigate replace to='login' />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='new-password' element={<NewPassword />} />
        <Route path='password-recover' element={<PasswordRecover />} />
        <Route path='verify-code' element={<VerificationCode />} />
        <Route path='invite-account' element={<InviteAccount />} />
      </Route>
      <Route path='' element={<AppLayout />}>
        <Route
          path=''
          element={<Navigate replace to='opportunities' />}
        ></Route>
        <Route path='opportunities' element={<Opportunities />} />
      </Route>
    </Routes>
  );
};

export default App;
