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
      state.members = payload;
      state.totalPages = 3;
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
export const fetchTeamList = (pageNumber) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    let { data } = await refractioApi.get('/teamMembers.json');
    setTimeout(() => {
      dispatch(setTeamList(data));
    }, 1500);
  } catch (error) {
    dispatch(setError(error.message));
  }
};
