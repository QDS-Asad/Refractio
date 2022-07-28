import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  opportunity: null,
  responses: null,
  success: false,
  message: '',
};

// our slice
const opportunityEvaluateSlice = createSlice({
  name: 'opportunityEvaluate',
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
    setResponses: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.responses = payload;
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
      state.responses = null;
    },
  },
});
// export the actions
export const {
  setLoading,
  setOpportunity,
  setError,
  setResponses,
  setSuccess,
  reset,
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
export const submitEvaluation = (id, opportunityId, body, flag = 0) => async (
  dispatch
) => {
  try {
    dispatch(setLoading());
    await refractioApi.put(
      `/opportunities/opportunity-response-evaluate/${id}`,
      { ...body }
    );
    if (flag === 0) {
      if (body.status === 'draft') {
        dispatch(setSuccess('Response saved as draft successfully.'));
      } else {
        dispatch(setSuccess('Response published successfully.'));
      }
    }
    dispatch(fetchResponses(opportunityId));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const resetEvaluation = () => async (dispatch) => {
  dispatch(reset());
};
