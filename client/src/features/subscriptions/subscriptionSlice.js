import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  success: false,
  discount: 0,
};

// our slice
const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setSubscription: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    setDiscount: (state, { payload }) => {
      state.loading = false;
      state.discount = payload;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.discount = 0;
    },
  },
});
// export the actions
export const {
  setLoading,
  setSubscription,
  setError,
  setDiscount,
  reset,
} = subscriptionSlice.actions;

export const subscriptionSelector = (state) => state.subscription;

// export the default reducer
export default subscriptionSlice.reducer;

// register user
export const userSubscription = (userId, body) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.put(`/users/subscribe/${userId}`, {
      ...body,
    });
    dispatch(setSubscription(true));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const subscriptionDiscount = (code) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.get(
      `/users/apply-coupon/${code}`
    );
    dispatch(setDiscount(response.data.amount_off));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
    dispatch(setDiscount(0));
  }
};

export const resetUserSubscription = () => (dispatch) => {
  dispatch(reset());
};
