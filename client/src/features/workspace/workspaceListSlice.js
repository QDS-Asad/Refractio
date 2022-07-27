import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  workspaces: {
    activeTeamList: [],
    invitedTeamList: [],
  },
};

// our slice
const workspaceListSlice = createSlice({
  name: 'workspaceList',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.workspaces = initialState.workspaces;
    },
    setWorkspaceList: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.workspaces = payload;
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
  setWorkspaceList,
  setError,
} = workspaceListSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const workspaceListSelector = (state) => state.workspaceList;

// export the default reducer
export default workspaceListSlice.reducer;

// fetch all roles
export const fetchWorkspaces = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.get(`/users/user-teams`);
    dispatch(setWorkspaceList(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
