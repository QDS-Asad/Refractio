import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  success: false,
};

// our slice
const addPlanSlice = createSlice({
  name: 'addPlan',
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
export const { setLoading, setSuccess, setError, reset } = addPlanSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const addPlanSelector = (state) => state.addPlan;

// export the default reducer
export default addPlanSlice.reducer;

export const addSubscriptionPlan = (body) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.post('/plans', {
      name: body.name,
      description: body.description,
      prices: [
        {
          amount: body.pricePerMonth,
          interval: 'month',
        },
        {
          amount: body.pricePerYear,
          interval: 'year',
        },
      ],
    });
    dispatch(setSuccess(true));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetAddPan = () => async (dispatch) => {
  dispatch(reset());
};
