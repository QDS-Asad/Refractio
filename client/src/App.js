import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import InviteAccount from './pages/auth/InviteAccount';
import VerificationCode from './pages/auth/VerificationCode';
import PasswordRecover from './pages/auth/PasswordRecover';
import NewPassword from './pages/auth/NewPassword';
import PasswordRecoverMail from './pages/auth/PasswordRecoverMail';
import SideBar from './pages/components/Sidebar';
import Navbar from './pages/components/Navbar';
import Auth from './pages/auth/Auth';
const App = () => {
  return (
    <Routes>
      <Route path='auth' element={<Auth />}>
        <Route path='' element={<Navigate replace to='login' />} />
        {/* <Route index element={<Login />} /> */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='new-password' element={<NewPassword />} />
        <Route path='password-recover' element={<PasswordRecover />} />
        <Route
          path='password-recover-success'
          element={<PasswordRecoverMail />}
        />
        <Route path='verify-code' element={<VerificationCode />} />
        <Route path='invite-account' element={<InviteAccount />} />
      </Route>
      <Route path='sidebar' element={<SideBar/>} />
      <Route path='navbar' element={<Navbar/>} />
    </Routes>
  );
};

export default App;
