import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  success: false,
};

// our slice
const changeCardSlice = createSlice({
  name: 'changeCard',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});
// export the actions
export const {
  setLoading,
  setSuccess,
  setError,
  reset,
} = changeCardSlice.actions;

export const changeCardSelector = (state) => state.changeCard;

// export the default reducer
export default changeCardSlice.reducer;

// register user
export const changeUserCard = (userId, body) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.put(`/users/change-payment-method/${userId}`, body);
    dispatch(setSuccess(true));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const AddUserCard = (userId, body) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.put(`/users/add-payment-method/${userId}`, body);
    dispatch(setSuccess(true));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetChangeCard = () => (dispatch) => {
  dispatch(reset());
};
