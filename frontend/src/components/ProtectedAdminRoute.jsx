import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token"); 
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    // Agar token nahi hai ya role admin nahi hai to redirect
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
