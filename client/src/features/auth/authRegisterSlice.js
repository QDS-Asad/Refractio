import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../common/refractioApi';

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
export const registerUser = (fullName, email, password) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let { data } = await authApi.post('/users/register', {
      fullName,
      email,
      password,
    });
    let { result } = data;
    dispatch(setUserRegister(result.data));
    window.localStorage.setItem('userRegister', JSON.stringify(result.data));
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
