import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

const PrivateRoute = ({ children }) => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
