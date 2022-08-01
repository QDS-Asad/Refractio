import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  success: false,
};
const abort = new AbortController();
// our slice
const removeMemberSlice = createSlice({
  name: 'removeMember',
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
    },
    reset: (state) => {
      abort.abort();
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
} = removeMemberSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const removeMemberSelector = (state) => {
  return state.removeMember;
};

// export the default reducer
export default removeMemberSlice.reducer;

// fetch all opportunities
export const removeMember = (member) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.delete(`/users/delete/${member}`);
    dispatch(setSuccess(true));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetRemoveTeamMember = () => async (dispatch) => {
  dispatch(reset());
};
