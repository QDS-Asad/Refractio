import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  opportunity: null,
  response: null,
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
    setResponse: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.response = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    setSuccess: (state, { payload }) => {
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
      state.response = null;
    },
  },
});
// export the actions
export const {
  setLoading,
  setOpportunity,
  setError,
  setSuccess,
  setResponse,
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
    dispatch(getResponse(id));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const getResponse = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.get(
      `/opportunities/opportunity-response/${id}`
    );
    dispatch(setResponse(response.data));
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
