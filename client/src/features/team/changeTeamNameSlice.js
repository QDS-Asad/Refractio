import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';
import { updateUserTeam } from '../auth/authLoginSlice';

// initial state
export const initialState = {
  loading: false,
  error: null,
  success: false,
};

// our slice
const changeTeamNameSlice = createSlice({
  name: 'changeTeamName',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
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
      state.loading = false;
      state.error = false;
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
} = changeTeamNameSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const changeTeamNameSelector = (state) => state.changeTeamName;

// export the default reducer
export default changeTeamNameSlice.reducer;

// fetch all opportunities
export const changeTeamname = (body) => async (dispatch) => {
  try {
    dispatch(setLoading());
    // await refractioApi.post('/users/invite-account', {
    //   teamName: body.teamName,
    // });
    setTimeout(() => {
      dispatch(updateUserTeam(body.teamName));
      dispatch(setSuccess(true));
    }, 2000);
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetchangeTeamName = () => async (dispatch) => {
  dispatch(reset());
};
