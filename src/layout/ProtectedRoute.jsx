import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuth) {
    // If not authenticated, redirect to login page
    // Save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the children
  return children;
};

export default ProtectedRoute;

