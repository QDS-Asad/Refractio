import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  opportunities: [],
};

// our slice
const opportunityListSlice = createSlice({
  name: 'opportunityList',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setOpportunityList: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.opportunities = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});
// export the actions
export const {
  setLoading,
  setOpportunityList,
  setError,
} = opportunityListSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const opportunityListSelector = (state) => state.opportunityList;

// export the default reducer
export default opportunityListSlice.reducer;

// fetch all opportunities
export const fetchOpportunities = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data } = await refractioApi.get('/opportunities.json');
    setTimeout(() => {
      dispatch(setOpportunityList(data));
    }, 1500);
  } catch (error) {
    dispatch(setError(error.message));
  }
};
