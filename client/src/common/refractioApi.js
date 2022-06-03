import axios from 'axios';

export default axios.create({
  baseURL: 'http://54.185.166.224/data',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const authApi = axios.create({
  baseURL: 'http://54.185.166.224/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
