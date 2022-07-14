import axios from 'axios';
import { logoutUser } from '../features/auth/authLoginSlice';
let baseURL = process.env.REACT_APP_URL;
if (process.env.REACT_APP_NODE_ENV === 'production') {
  baseURL = '';
}

export const localAPI = axios.create({
  baseURL: `${baseURL}/data`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const http = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const interceptor = (store) => {
  http.interceptors.request.use((config) => {
    config.headers = authHeader();
    return config;
  });
  http.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const code =
        error.response && error.response.data
          ? error.response.data.code
          : error.response.status;
      if (code === 401) {
        store.dispatch(logoutUser());
      }
      return error;
    }
  );
};

export default http;

export function authHeader() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (user && user.token) {
    return { authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}
