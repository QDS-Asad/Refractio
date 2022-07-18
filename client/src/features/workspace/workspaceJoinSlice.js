import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

// initial state
export const initialState = {
  loading: false,
  error: null,
  joinWorkspace: null,
};

// our slice
const workspaceJoinSlice = createSlice({
  name: 'workspaceJoin',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setJoinWorkspace: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.workspaceJoin = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.workspaceJoin = null;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.workspaceJoin = null;
    },
  },
});
// export the actions
export const {
  setLoading,
  setJoinWorkspace,
  setError,
  reset,
} = workspaceJoinSlice.actions;

export const workspaceJoinSelector = (state) => state.workspaceJoin;

// export the default reducer
export default workspaceJoinSlice.reducer;

// login user
export const joinNewWorkspace = (userId, teamId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.put(
      `/users/join-team/${userId}/${teamId}`
    );
    dispatch(setJoinWorkspace(response.message));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetJoinWorkspace = () => (dispatch) => {
  dispatch(reset());
};
