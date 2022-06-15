import { configureStore } from '@reduxjs/toolkit';
import authForgetPasswordSlice from './auth/authForgetPasswordSlice';
import authLoginSlice from './auth/authLoginSlice';
import authNewPasswordSlice from './auth/authNewPasswordSlice';
import authRegisterSlice from './auth/authRegisterSlice';
import authVerifyCodeSlice from './auth/authVerifyCodeSlice';
import roleListSlice from './roles/roleList';
import opportunityCreateSlice from './opportunities/opportunityCreateSlice';
import opportunityDetailSlice from './opportunities/opportunityDetailSlice';
import opportunityListSlice from './opportunities/opportunityListSlice';
import inviteMemberSlice from './team/inviteMemberSlice';
import teamListSlice from './team/teamListSlice';

export default configureStore({
  reducer: {
    authLogin: authLoginSlice,
    authRegister: authRegisterSlice,
    authVerifyCode: authVerifyCodeSlice,
    authForgetPassword: authForgetPasswordSlice,
    authNewPassword: authNewPasswordSlice,
    roleList: roleListSlice,
    opportunityList: opportunityListSlice,
    opportunityDetail: opportunityDetailSlice,
    opportunityCreate: opportunityCreateSlice,
    teamList: teamListSlice,
    inviteMember: inviteMemberSlice,
  },
});
