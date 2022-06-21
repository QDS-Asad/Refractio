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
import OpportunityDetail from './pages/app/Opportunities/OpportunityDetail';
import OpportunityEdit from './pages/app/Opportunities/OpportunityEdit';
import SubscriptionLayout from './layouts/SubscriptionLayout';
import Subscription from './pages/subscription/Subscription';
import TeamMembers from './pages/app/team/TeamMembers';
import Billing from './pages/app/billing/Billing';
const App = () => {
  return (
    <Routes>
      <Route path='auth' element={<Auth />}>
        <Route path='' element={<Navigate replace to='login' />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='new-password/:token' element={<NewPassword />} />
        <Route path='password-recover' element={<PasswordRecover />} />
        <Route path='verify-code' element={<VerificationCode />} />
        <Route path='invite-account/:token' element={<InviteAccount />} />
      </Route>
      <Route path='subscription' element={<SubscriptionLayout />}>
        <Route path='' element={<Subscription />} />
      </Route>
      <Route path='' element={<AppLayout />}>
        <Route
          path=''
          element={<Navigate replace to='opportunities' />}
        ></Route>
        <Route path='opportunities' element={<Opportunities />} />
        <Route path='opportunities/:id' element={<OpportunityDetail />} />
        <Route path='opportunities/:id/edit' element={<OpportunityEdit />} />
        <Route path='team' element={<TeamMembers />} />
        <Route path='billing' element={<Billing />} />
      </Route>
    </Routes>
  );
};

export default App;
