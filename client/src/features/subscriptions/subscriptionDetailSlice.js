import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  subscription: null,
};

// our slice
const subscriptionDetailSlice = createSlice({
  name: 'subscriptionDetail',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setSubscription: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.subscription = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.subscription = null;
    },
  },
});
// export the actions
export const {
  setLoading,
  setSubscription,
  setError,
  reset,
} = subscriptionDetailSlice.actions;

export const subscriptionDetailSelector = (state) => state.subscriptionDetail;

// export the default reducer
export default subscriptionDetailSlice.reducer;

export const fetchSubscriptionDetail = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data: response } = await refractioApi.get(
      `/users/subscription-details`
    );
    dispatch(setSubscription(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
