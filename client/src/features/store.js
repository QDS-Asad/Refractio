import { configureStore } from '@reduxjs/toolkit';
import authLoginSlice from './auth/authLoginSlice';
import authRegisterSlice from './auth/authRegisterSlice';
import authVerifyCodeSlice from './auth/authVerifyCodeSlice';
import opportunityCreateSlice from './opportunities/opportunityCreateSlice';
import opportunityDetailSlice from './opportunities/opportunityDetailSlice';
import opportunityListSlice from './opportunities/opportunityListSlice';

export default configureStore({
  reducer: {
    authLogin: authLoginSlice,
    authRegister: authRegisterSlice,
    authVerifyCode: authVerifyCodeSlice,
    opportunityList: opportunityListSlice,
    opportunityDetail: opportunityDetailSlice,
    opportunityCreate: opportunityCreateSlice,
  },
});
