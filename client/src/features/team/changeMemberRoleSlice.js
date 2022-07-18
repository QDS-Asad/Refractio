import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  success: false,
};

// our slice
const changeMemberRoleSlice = createSlice({
  name: 'changeMemberRole',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    setSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.success = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    reset: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});
// export the actions
export const {
  setLoading,
  setSuccess,
  setError,
  reset,
} = changeMemberRoleSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const changeMemberRoleSelector = (state) => {
  return state.changeMemberRole;
};

// export the default reducer
export default changeMemberRoleSlice.reducer;

export const changeRole = (userId, roleId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.put(`/users/update-user-role/${userId}/${roleId}`);
    dispatch(setSuccess(true));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetChangeRole = () => async (dispatch) => {
  dispatch(reset());
};
