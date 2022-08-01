import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';
import { logoutUser, setUserLogin } from '../auth/authLoginSlice';

let userInfoFromStorage = window.localStorage.getItem('userInfo')
  ? window.localStorage.getItem('userInfo')
  : null;

try {
  userInfoFromStorage = JSON.parse(userInfoFromStorage);
} catch (error) {
  userInfoFromStorage = null;
}

// initial state
export const initialState = {
  loading: false,
  error: null,
  userWorkspace: userInfoFromStorage,
};

// our slice
const workspaceSelectSlice = createSlice({
  name: 'workspaceSelect',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setUserWorkspace: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userWorkspace = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.userWorkspace = null;
    },
    logoutWorkspace: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userWorkspace = null;
    },
  },
});
// export the actions
export const {
  setLoading,
  setUserWorkspace,
  setError,
  logoutWorkspace,
} = workspaceSelectSlice.actions;

export const workspaceSelectSelector = (state) => state.workspaceSelect;

// export the default reducer
export default workspaceSelectSlice.reducer;

// login user
export const selectWorkspace = (team) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.post('/users/select-team', {
      team,
    });
    dispatch(setUserWorkspace(response.data));
    dispatch(setUserLogin(response.data));
    window.localStorage.setItem('userInfo', JSON.stringify(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const removeSelf = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    await refractioApi.delete(`/users/remove-my-account`);
    dispatch(logoutUser());
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const createWorkspace = () => async (dispatch, getState) => {
  let userInfo = Object.assign({}, getState().workspaceSelect.userWorkspace);
  userInfo.isRegistered = true;
  dispatch(setUserWorkspace(userInfo));
};

export const cancelWorkspace = () => async (dispatch, getState) => {
  let userInfo = Object.assign({}, getState().workspaceSelect.userWorkspace);
  userInfo.isRegistered = false;
  dispatch(setUserWorkspace(userInfo));
};
