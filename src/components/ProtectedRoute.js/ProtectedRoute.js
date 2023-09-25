import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../api';

const ProtectedRoute = ({ children }) => {
  
  const location = useLocation();
  const auth = isAuthenticated();

  return auth ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;