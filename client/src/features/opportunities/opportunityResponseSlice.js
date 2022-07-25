import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  opportunity: null,
};

// our slice
const opportunityResponseSlice = createSlice({
  name: 'opportunityResponse',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setOpportunity: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.opportunity = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
// export the actions
export const {
  setLoading,
  setOpportunity,
  setError,
} = opportunityResponseSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const opportunityResponseSelector = (state) => state.opportunityResponse;

// export the default reducer
export default opportunityResponseSlice.reducer;

// fetch opportunity details
export const fetchOpportunity = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.get(`/opportunities/${id}`);
    dispatch(setOpportunity(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
