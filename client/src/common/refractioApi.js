import axios from 'axios';

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

http.interceptors.request.use(function (config) {
  console.log(config);
  config.headers = authHeader();
  return config;
});

export default http;

export function authHeader() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (user && user.token) {
    return { 'authorization': `Bearer ${user.token}` };
  } else {
    return {};
  }
}
