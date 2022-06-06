import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../common/refractioApi';

// let userInfoFromStorage = window.localStorage.getItem('userInfo')
//   ? window.localStorage.getItem('userInfo')
//   : null;

// try {
//   userInfoFromStorage = JSON.parse(userInfoFromStorage);
// } catch (error) {
//   userInfoFromStorage = null;
// }

// initial state
export const initialState = {
  loading: false,
  error: null,
  verifyCode: null,
};

// our slice
const authVerifyCodeSlice = createSlice({
  name: 'authVerifyCode',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setVerifyCode: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.verifyCode = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.verifyCode = null;
    },
  },
});
// export the actions
export const {
  setLoading,
  setVerifyCode,
  setError,
} = authVerifyCodeSlice.actions;

export const authVerifyCodeSelector = (state) => state.authVerifyCode;

// export the default reducer
export default authVerifyCodeSlice.reducer;

// login user
export const codeVerification = (userId, otp) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data } = await authApi.post('/users/verify-login', { userId, otp });
    dispatch(setVerifyCode(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
