import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

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
  },
});
// export the actions
export const {
  setLoading,
  setOpportunity,
  setError,
} = opportunityCreateSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const opportunityCreateSelector = (state) => state.opportunityCreate;

// export the default reducer
export default opportunityCreateSlice.reducer;

// fetch opportunity details
export const createOpportunity = (opportunity) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data } = await refractioApi.get('/opportunities.json');
    console.log(data);
    setTimeout(() => {
      dispatch(setOpportunity(opportunity));
    }, 1500);
  } catch (error) {
    dispatch(setError(error.message));
  }
};
