import axios from 'axios';

let baseURL = process.env.REACT_APP_URL;
if (process.env.REACT_APP_NODE_ENV === 'production') {
  baseURL = '';
}

export default axios.create({
  baseURL: `${baseURL}/data`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const authApi = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export function authHeader() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.accessToken}` };
  } else {
    return {};
  }
}
