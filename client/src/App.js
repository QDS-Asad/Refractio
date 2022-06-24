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
import Forbidden from './pages/misc/Forbidden';
import NotFound from './pages/misc/NotFound';
import { ROLES } from './common/constants';
import ProtectedRoute from './components/ProtectedRoute';
import ManageUsers from './pages/admin/manage-user/ManageUsers';
import ManageOrders from './pages/admin/manage-orders/ManageOrders';
import ManageSubscriptions from './pages/admin/manage-subscriptions/ManageSubscriptions';
import ManageOpportunities from './pages/admin/manage-opportunities/ManageOpportunities';
import ManageContent from './pages/admin/manage-content/ManageContent';
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
        <Route
          path='opportunities'
          element={
            <ProtectedRoute
              roles={[ROLES.ADMIN, ROLES.ORGANIZER, ROLES.PARTICIPANT]}
            >
              <Opportunities />
            </ProtectedRoute>
          }
        />
        <Route
          path='opportunities/:id'
          element={
            <ProtectedRoute
              roles={[ROLES.ADMIN, ROLES.ORGANIZER, ROLES.PARTICIPANT]}
            >
              <OpportunityDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path='opportunities/:id/edit'
          element={
            <ProtectedRoute
              roles={[ROLES.ADMIN, ROLES.ORGANIZER, ROLES.PARTICIPANT]}
            >
              <OpportunityEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path='team'
          element={
            <ProtectedRoute
              roles={[ROLES.ADMIN, ROLES.ORGANIZER, ROLES.PARTICIPANT]}
            >
              <TeamMembers />
            </ProtectedRoute>
          }
        />
        <Route
          path='billing'
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <Billing />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path='admin' element={<AppLayout />}>
        <Route path='' element={<Navigate replace to='users' />} />
        <Route
          path='users'
          element={
            <ProtectedRoute roles={[ROLES.SUPER_ADMIN]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path='orders'
          element={
            <ProtectedRoute roles={[ROLES.SUPER_ADMIN]}>
              <ManageOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='subscriptions'
          element={
            <ProtectedRoute roles={[ROLES.SUPER_ADMIN]}>
              <ManageSubscriptions />
            </ProtectedRoute>
          }
        />
        <Route
          path='opportunities'
          element={
            <ProtectedRoute roles={[ROLES.SUPER_ADMIN]}>
              <ManageOpportunities />
            </ProtectedRoute>
          }
        />
        <Route
          path='content'
          element={
            <ProtectedRoute roles={[ROLES.SUPER_ADMIN]}>
              <ManageContent />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path='forbidden' element={<Forbidden />} />
      <Route path='notfound' element={<NotFound />} />
    </Routes>
  );
};

export default App;
