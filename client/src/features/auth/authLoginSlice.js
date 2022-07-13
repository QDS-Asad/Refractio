import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';
import { logoutWorkspace } from '../workspace/workspaceSelectSlice';

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
  userLogin: userInfoFromStorage,
  isAuthenticated: userInfoFromStorage !== null ? true : false,
};

// our slice
const authLoginSlice = createSlice({
  name: 'authLogin',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setUserLogin: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userLogin = payload;
      state.isAuthenticated = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.userLogin = null;
      state.isAuthenticated = false;
    },
    setLogout: (state) => {
      state.loading = false;
      state.error = false;
      state.userLogin = null;
      state.isAuthenticated = false;
    },
  },
});
// export the actions
export const {
  setLoading,
  setUserLogin,
  setError,
  setLogout,
} = authLoginSlice.actions;

export const authLoginSelector = (state) => state.authLogin;

// export the default reducer
export default authLoginSlice.reducer;

// login user
export const loginUser = (email, password, rememberMe = false) => async (
  dispatch
) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.post('/users/login', {
      email,
      password,
      rememberMe,
    });
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

// logout user
export const logoutUser = () => async (dispatch) => {
  dispatch(setLogout());
  dispatch(logoutWorkspace());
  window.localStorage.removeItem('userInfo');
};

export const updateUserStatus = () => async (dispatch, getState) => {
  let userInfo = Object.assign({}, getState().authLogin.userLogin);
  userInfo.isRegistered = false;
  dispatch(setUserLogin(userInfo));
  window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
};
