import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  opportunity: null,
  responses: null,
};

// our slice
const opportunityEvaluateSlice = createSlice({
  name: 'opportunityEvaluate',
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
    setResponses: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.responses = payload;
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
  setResponses,
} = opportunityEvaluateSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const opportunityEvaluateSelector = (state) => state.opportunityEvaluate;

// export the default reducer
export default opportunityEvaluateSlice.reducer;

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
export const fetchResponses = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.get(
      `/opportunities/opportunity-responses/${id}`
    );
    dispatch(setResponses(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
