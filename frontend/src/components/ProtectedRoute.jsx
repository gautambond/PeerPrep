import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const { user } = useContext(AuthContext);

  // 🚀 FIX: While loading user from localStorage, DON'T redirect
  if (user === undefined) {
    return <div>Loading...</div>; // or a spinner
  }

  // If no logged-in user → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user role is not allowed → block access
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
