import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

const PrivateRoute = () => {
  const { authenticated } = useContext(AuthContext);
  return authenticated ? <Navigate to="/" /> : <Navigate to="/login" />;
};
export default PrivateRoute;
