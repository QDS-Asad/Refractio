import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  plans: [],
};

// our slice
const planListSlice = createSlice({
  name: 'planList',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.plans = [];
    },
    setPlanList: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.plans = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
// export the actions
export const { setLoading, setPlanList, setError } = planListSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const planListSelector = (state) => state.planList;

// export the default reducer
export default planListSlice.reducer;

// fetch all roles
export const fetchPlans = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.get('/plans');
    dispatch(setPlanList(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
