import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  orders: [
    {
      _id: '1',
      orderId: '#736362525',
      date: '02/02/2021',
      user: 'Eric Butler',
      plan: 'Team',
      subscription: true,
      status: 'completed',
      amount: 7,
    },
  ],
  page: 1,
  limit: 10,
  totalPages: 1,
  column: 'orderId',
  direction: 'ascending',
};

// our slice
const orderListSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setOrderList: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.orders = payload.docs;
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
  setOrderList,
  setSort,
  setError,
} = orderListSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const orderListSelector = (state) => state.orderList;

// export the default reducer
export default orderListSlice.reducer;

// fetch billing history
export const fetchOrderList = (pageNumber, pageSize) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data } = await refractioApi.get(
      `/users/billing-history?page=${pageNumber}&page_size=${pageSize}`
    );
    dispatch(setOrderList(data.data));
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
