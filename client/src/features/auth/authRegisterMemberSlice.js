import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  registerMember: null,
};

// our slice
const authRegisterMemberSlice = createSlice({
  name: 'authRegisterMember',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setRegisterMember: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.registerMember = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.registerMember = null;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.registerMember = null;
    },
  },
});
// export the actions
export const {
  setLoading,
  setRegisterMember,
  setError,
  reset,
} = authRegisterMemberSlice.actions;

export const authRegisterMemberSelector = (state) => state.authRegisterMember;

// export the default reducer
export default authRegisterMemberSlice.reducer;

// code Verification
export const memberRegistration = (userId, body) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.put(
      `/users/register-invite-account/${userId}`,
      body
    );
    dispatch(setRegisterMember(response.message));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetRegisterMember = () => (dispatch) => {
  dispatch(reset());
};
