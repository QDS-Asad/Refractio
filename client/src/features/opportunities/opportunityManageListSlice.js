import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  opportunities: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  column: 'name',
  direction: 'ascending',
};

// our slice
const opportunityManageListSlice = createSlice({
  name: 'opportunityManageList',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setOpportunityList: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.opportunities = payload.docs;
      state.totalPages = payload.totalPages;
    },
    setSort: (state, { payload }) => {
      state.column = payload.column;
      state.direction = payload.direction;
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
  setOpportunityList,
  setSort,
  setError,
} = opportunityManageListSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const opportunityManageListSelector = (state) =>
  state.opportunityManageList;

// export the default reducer
export default opportunityManageListSlice.reducer;

// fetch billing history
export const fetchOpportunityList = (pageNumber, pageSize) => async (
  dispatch
) => {
  try {
    dispatch(setLoading());
    let { data } = await refractioApi.get(
      `/opportunities/all?page=${pageNumber}&page_size=${pageSize}`
    );
    dispatch(setOpportunityList(data.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const sortList = (column, direction) => async (dispatch) => {
  dispatch(setSort({ column, direction }));
};
