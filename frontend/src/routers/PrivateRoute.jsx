import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("userForOrders", user);
  if (loading) {
    return <div>Loading...</div>;
  }
  // setTimeout(() => {
  // }, 0);
  if (user) {
    return children;
  }
  return <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
