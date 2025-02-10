// src/axios.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:44301/api/admin', // Replace with your backend URL
});

export default axiosInstance;
