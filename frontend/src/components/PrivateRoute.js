import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Path corrected

// We accept `children` as a prop here. `children` will be the <Dashboard /> component.
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Show a loading message while we check for authentication
    return <div className="text-center p-8">Loading...</div>;
  }

  // If the user is authenticated, we render the children (the Dashboard).
  // Otherwise, we redirect them to the login page.
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

