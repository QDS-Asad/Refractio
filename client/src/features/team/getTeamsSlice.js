import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  members: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  success: false,
};

// our slice
const getTeamsSlice = createSlice({
  name: 'getTeams',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.members = [];
      state.error = null;
      state.success = false;
    },
    setTeamList: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.members = payload.docs;
      state.totalPages = payload.totalPages;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setPageNumber: (state, { payload }) => {
      state.page = payload;
    },
    setSuccess: (state, { payload }) => {
      state.success = payload;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.page = 1;
      state.members = [];
      state.limit = 10;
      state.totalPages = 1;
      state.success = false;
    },
  },
});
// export the actions
export const {
  setLoading,
  setTeamList,
  setError,
  setPageNumber,
  setSuccess,
  reset,
} = getTeamsSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const getTeamsSelector = (state) => state.getTeams;

// export the default reducer
export default getTeamsSlice.reducer;

// fetch all opportunities
export const fetchAllTeamList = (pageNumber, pageSize) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data } = await refractioApi.get(
      `/users/all-team?page=${pageNumber}&page_size=${pageSize}`
    );
    dispatch(setTeamList(data.data));
    dispatch(setPageNumber(pageNumber));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const deleteTeamList = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.delete(`/users/delete-team/${id}`);
    dispatch(setSuccess(true));
    dispatch(setPageNumber(1));
    dispatch(fetchAllTeamList(1, 10));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const resetGetTeam = () => async (dispatch) => {
  dispatch(reset());
};
