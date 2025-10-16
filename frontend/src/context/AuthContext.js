import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../api/index.js'; // Corrected the import path

// 1. Create The Context
const AuthContext = createContext();

// 2. Define The Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};

// 3. Create The Provider Component
const AuthProvider = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Function to load user data based on the token
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set the auth token for all future API requests
      api.defaults.headers.common['x-auth-token'] = token;
      try {
        const res = await api.get('/auth');
        dispatch({ type: 'USER_LOADED', payload: res.data });
      } catch (err) {
        dispatch({ type: 'AUTH_ERROR' });
      }
    } else {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };
  
  // Run loadUser on initial component mount
  useEffect(() => {
    loadUser();
  }, []);
  
  // Login function: stores token and then loads user
  const login = async (token) => {
    localStorage.setItem('token', token);
    await loadUser(); // Fetch user data immediately after signing up/logging in
  };

  // Logout function
  const logout = () => {
    delete api.defaults.headers.common['x-auth-token'];
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {!state.loading && children}
    </AuthContext.Provider>
  );
};

// 4. Custom Hook for easy context consumption
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthContext };

