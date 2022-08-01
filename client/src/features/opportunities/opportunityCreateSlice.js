import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';
import { fetchOpportunities } from './opportunityListSlice';

// initial state
export const initialState = {
  loading: false,
  error: null,
  opportunity: null,
  success: false,
};

// our slice
const opportunityCreateSlice = createSlice({
  name: 'opportunityCreate',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setOpportunity: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.opportunity = payload;
      state.success = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.opportunity = null;
      state.success = false;
    },
  },
});
// export the actions
export const {
  setLoading,
  setOpportunity,
  setError,
  reset,
} = opportunityCreateSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const opportunityCreateSelector = (state) => state.opportunityCreate;

// export the default reducer
export default opportunityCreateSlice.reducer;

// create opportunity
export const createOpportunity = (opportunity) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.post('/opportunities/create', opportunity);
    dispatch(setOpportunity(opportunity));
    dispatch(fetchOpportunities());
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const resetCreateOpportunity = () => async (dispatch) => {
  dispatch(reset());
};
