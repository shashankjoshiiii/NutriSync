import axios from 'axios';

// ✅ Dynamically choose backend URL for local & production
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  This interceptor runs before each request.
  It checks if a token exists in localStorage (meaning the user is logged in).
  If it exists, it adds the token to the request's 'x-auth-token' header.
  This is how protected routes on the backend will recognize an authenticated user.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
