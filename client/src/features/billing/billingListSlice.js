import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  billing: [],
  page: 1,
  limit: 10,
  totalPages: 1,
};

// our slice
const billingListSlice = createSlice({
  name: 'billingList',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setBillingList: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.billing = payload.docs;
      state.totalPages = payload.totalPages;
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
  setBillingList,
  setError,
} = billingListSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const billingListSelector = (state) => state.billingList;

// export the default reducer
export default billingListSlice.reducer;

// fetch billing history
export const fetchBillingList = (pageNumber, pageSize) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data } = await refractioApi.get(
      `/users/billing-history?page=${pageNumber}&page_size=${pageSize}`
    );
    dispatch(setBillingList(data.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
