import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import InviteAccount from './pages/auth/InviteAccount';
import VerificationCode from './pages/auth/VerificationCode';
import PasswordRecover from './pages/auth/PasswordRecover';
import PasswordRecoverMail from './pages/auth/PasswordRecoverMail';
import NewPassword from './pages/auth/NewPassword';
import ResetPasswordFlow from './pages/auth/ResetPasswordFlow'
const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/new-password' element={<NewPassword />} />
      <Route path='/password-recover' element={<ResetPasswordFlow />} />
      <Route path='/verify-code' element={<VerificationCode />} />
      <Route path='/invite-account' element={<InviteAccount />} />
    </Routes>
  );
};

export default App;
