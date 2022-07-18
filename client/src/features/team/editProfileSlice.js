import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';
import { updateUserProfile } from '../auth/authLoginSlice';

// initial state
export const initialState = {
  loading: false,
  error: null,
  success: false,
};

// our slice
const editProfileSlice = createSlice({
  name: 'editProfile',
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
} = editProfileSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const editProfileSelector = (state) => state.editProfile;

// export the default reducer
export default editProfileSlice.reducer;

// fetch all opportunities
export const editUserProfile = (body) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.put('/users/change-name', {
      ...body,
    });
    let { firstName, lastName } = body;
    dispatch(updateUserProfile(firstName, lastName));
    dispatch(setSuccess(true));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetEditProfile = () => async (dispatch) => {
  dispatch(reset());
};
