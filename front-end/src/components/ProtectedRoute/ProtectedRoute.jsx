import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext.jsx";

export default function ProtectedRoute({ children }) {
 const {token} = useContext(UserContext)
  const user = localStorage.getItem("token");
  if (token) {
  return children;
  }
  return <Navigate to="/login" />;
}
