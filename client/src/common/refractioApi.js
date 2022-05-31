import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000/data',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
