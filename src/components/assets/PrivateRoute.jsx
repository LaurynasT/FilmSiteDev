import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../assets/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;