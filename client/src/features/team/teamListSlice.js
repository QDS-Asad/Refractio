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
};

// our slice
const teamListSlice = createSlice({
  name: 'teamList',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
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
  },
});
// export the actions
export const { setLoading, setTeamList, setError } = teamListSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const teamListSelector = (state) => state.teamList;

// export the default reducer
export default teamListSlice.reducer;

// fetch all opportunities
export const fetchTeamList = (pageNumber, pageSize) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data } = await refractioApi.get(
      `/users/team?page=${pageNumber}&page_size=${pageSize}`
    );
    dispatch(setTeamList(data.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
