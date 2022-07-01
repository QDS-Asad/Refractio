import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  success: false,
};

// our slice
const subscriptionResumeSlice = createSlice({
  name: 'subscriptionResume',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = null;
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
} = subscriptionResumeSlice.actions;

export const subscriptionResumeSelector = (state) => state.subscriptionResume;

// export the default reducer
export default subscriptionResumeSlice.reducer;

export const ResumeUserSubscription = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.put(`/users/resume-subscription`);
    dispatch(setSuccess(true));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetSubscriptionResume = () => (dispatch) => {
  dispatch(reset());
};
