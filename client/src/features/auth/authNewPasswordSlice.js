import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  newPassword: null,
};

// our slice
const authNewPasswordSlice = createSlice({
  name: 'authNewPassword',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setNewPassword: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.newPassword = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.newPassword = null;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.newPassword = null;
    },
  },
});
// export the actions
export const {
  setLoading,
  setNewPassword,
  setError,
  reset,
} = authNewPasswordSlice.actions;

export const authNewPasswordSelector = (state) => state.authNewPassword;

// export the default reducer
export default authNewPasswordSlice.reducer;

// new password
export const userNewPassword = (token, body) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await authApi.put(
      `/users/reset-password/${token}`,
      body
    );
    dispatch(setNewPassword(response.success));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetNewPassword = () => (dispatch) => {
  dispatch(reset());
};
