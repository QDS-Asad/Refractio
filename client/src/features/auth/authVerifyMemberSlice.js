import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  verifyMember: null,
};

// our slice
const authVerifyMemberSlice = createSlice({
  name: 'authVerifyMember',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setVerifyMember: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.verifyMember = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.verifyMember = null;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.verifyMember = null;
    },
  },
});
// export the actions
export const {
  setLoading,
  setVerifyMember,
  setError,
  reset,
} = authVerifyMemberSlice.actions;

export const authVerifyMemberSelector = (state) => state.authVerifyMember;

// export the default reducer
export default authVerifyMemberSlice.reducer;

// code Verification
export const memberVerification = (token, team) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.get(
      `/users/verify-invite-account/${token}/${team}`
    );
    dispatch(setVerifyMember(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetVerifiyMember = () => (dispatch) => {
  dispatch(reset());
};
