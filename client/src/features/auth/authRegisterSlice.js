import { createSlice } from '@reduxjs/toolkit';
import refractioApi from '../../common/refractioApi';

let userInfoFromStorage = window.localStorage.getItem('userRegister')
  ? window.localStorage.getItem('userRegister')
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
  userRegister: userInfoFromStorage,
};

// our slice
const authRegisterSlice = createSlice({
  name: 'authRegister',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setUserRegister: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userRegister = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.userRegister = null;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.userRegister = null;
    },
  },
});
// export the actions
export const {
  setLoading,
  setUserRegister,
  setError,
  reset,
} = authRegisterSlice.actions;

export const authRegisterSelector = (state) => state.authRegister;

// export the default reducer
export default authRegisterSlice.reducer;

// register user
export const registerUser = (firstName, lastName, email, password) => async (
  dispatch
) => {
  try {
    dispatch(setLoading());
    let { data: response } = await refractioApi.post('/users/register', {
      firstName,
      lastName,
      email,
      password,
    });
    let { data } = response;
    dispatch(setUserRegister(data));
    window.localStorage.setItem('userRegister', JSON.stringify(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetRegister = () => (dispatch) => {
  dispatch(reset());
  localStorage.removeItem('userRegister');
};
