import axios from 'axios';

export default axios.create({
  baseURL: './data',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
