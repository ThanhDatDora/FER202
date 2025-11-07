// src/api/moviesApi.js
import axios from 'axios';

const movieApi = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

export default movieApi;
