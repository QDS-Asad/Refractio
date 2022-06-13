import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  verifyCode: null,
  resendCode: null,
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
      state.resendCode = null;
    },
    setResendCode: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.verifyCode = null;
      state.resendCode = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.verifyCode = null;
      state.resendCode = null;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.verifyCode = null;
      state.resendCode = null;
    },
  },
});
// export the actions
export const {
  setLoading,
  setVerifyCode,
  setResendCode,
  setError,
  reset,
} = authVerifyCodeSlice.actions;

export const authVerifyCodeSelector = (state) => state.authVerifyCode;

// export the default reducer
export default authVerifyCodeSlice.reducer;

// code Verification
export const codeVerification = (userId, otp) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await authApi.post('/users/verify-register', {
      userId,
      otp,
    });
    dispatch(setVerifyCode(response.success));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

// resend code
export const resendVerifyCode = (userId, email) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await authApi.post('/users/resend-verify-code', {
      userId,
      email,
    });
    let { data } = response;
    dispatch(setResendCode(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetVerifiyCode = () => (dispatch) => {
  dispatch(reset());
};
