import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';
import { getOpportunityResponse } from './opportunityGetResponseSlice';

// initial state
export const initialState = {
  loading: false,
  error: null,
  opportunity: null,
  success: false,
  message: '',
};

// our slice
const opportunityResponseSlice = createSlice({
  name: 'opportunityResponse',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.success = false;
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
      state.success = false;
    },
    setSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.message = payload;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.opportunity = null;
      state.message = '';
      state.success = false;
    },
  },
});
// export the actions
export const {
  setLoading,
  setOpportunity,
  setError,
  setSuccess,
  reset,
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
export const respondOpportunity = (id, body) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.put(`/opportunities/opportunity-response/${id}`, {
      ...body,
    });
    if (body.status === 'draft') {
      dispatch(setSuccess('Response saved as draft successfully.'));
    } else {
      dispatch(setSuccess('Response published successfully.'));
    }
    dispatch(getOpportunityResponse(id));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const resetResponse = () => async (dispatch) => {
  dispatch(reset());
};
