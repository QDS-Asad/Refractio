import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  success: false,
};

// our slice
const removePlanSlice = createSlice({
  name: 'removePlan',
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
} = removePlanSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const removePlanSelector = (state) => state.removePlan;

// export the default reducer
export default removePlanSlice.reducer;

export const removeSubscriptionPlan = (planId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.delete(`/plans/${planId}`);
    dispatch(setSuccess(true));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetRemovePan = () => async (dispatch) => {
  dispatch(reset());
};
