import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  success: false,
};

// our slice
const subscriptionCancelSlice = createSlice({
  name: 'subscriptionCancel',
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
} = subscriptionCancelSlice.actions;

export const subscriptionCancelSelector = (state) => state.subscriptionCancel;

// export the default reducer
export default subscriptionCancelSlice.reducer;

export const CancelUserSubscription = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.delete(`/users/cancel-subscription`);
    dispatch(setSuccess(true));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetSubscriptionCancel = () => (dispatch) => {
  dispatch(reset());
};
