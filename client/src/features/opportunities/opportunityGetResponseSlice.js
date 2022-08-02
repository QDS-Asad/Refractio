import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  response: null,
  success: false,
  message: '',
};

// our slice
const opportunityGetResponseSlice = createSlice({
  name: 'opportunityGetResponse',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.success = false;
      state.loading = true;
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
      state.loading = false;
      state.error = null;
      state.success = true;
      state.message = payload;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.message = '';
      state.success = false;
      state.response = null;
    },
  },
});
// export the actions
export const {
  setLoading,
  setError,
  setSuccess,
  setResponse,
  reset,
} = opportunityGetResponseSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const opportunityGetResponseSelector = (state) =>
  state.opportunityGetResponse;

// export the default reducer
export default opportunityGetResponseSlice.reducer;

// fetch opportunity details
export const getOpportunityResponse = (id) => async (dispatch) => {
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
export const resetGetResponse = () => async (dispatch) => {
  dispatch(reset());
};
