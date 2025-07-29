import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, role }) {
  const { user } = useAuth();

  console.log("🔍 PrivateRoute Debug:", { user, role, userRole: user?.role });

  if (!user) {
    console.log("❌ No user, redirecting to login");
    return <Navigate to="/login" />;
  }

  if (role && Array.isArray(role)) {
    if (!role.includes(user.role)) {
      console.log(
        "❌ User role not in allowed roles:",
        user.role,
        "not in",
        role
      );
      return <Navigate to="/" />;
    }
  } else if (role && user.role !== role) {
    console.log("❌ User role doesn't match:", user.role, "!=", role);
    return <Navigate to="/" />;
  }

  console.log("✅ Access granted to:", user.role);
  return children;
}
