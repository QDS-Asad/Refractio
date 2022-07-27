import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  success: false,
  admins: [],
};

// our slice
const transferOwnersSlice = createSlice({
  name: 'transferOwner',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.success = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setAdminList: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.admins = payload;
    },
    reset: (state) => {
      state.loading = false;
      state.error = false;
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
  setAdminList,
} = transferOwnersSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const transferOwnershipSelector = (state) => state.transferOwner;

// export the default reducer
export default transferOwnersSlice.reducer;

// fetch all opportunities
export const transferOwnershipCall = (member) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.put(`/users/ownership-transfer/${member}`);
    dispatch(setSuccess(true));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetTransferOwner = () => async (dispatch) => {
  dispatch(reset());
};

export const fetchAdmins = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.get(
      '/users/team-administrators'
    );
    dispatch(setAdminList(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
