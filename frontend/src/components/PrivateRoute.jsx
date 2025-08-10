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

  // If no role is specified but we have a function as children,
  // just render it with the user
  if (!role && typeof children === 'function') {
    console.log("✅ Access granted (function child with no role restriction)");
    return children({ user });
  }

  // If role is specified, check it
  if (role) {
    if (Array.isArray(role)) {
      if (!role.includes(user.role)) {
        console.log(
          "❌ User role not in allowed roles:",
          user.role,
          "not in",
          role
        );
        return <Navigate to="/" />;
      }
    } else if (user.role !== role) {
      console.log("❌ User role doesn't match:", user.role, "!=", role);
      return <Navigate to="/" />;
    }
  }

  console.log("✅ Access granted to:", user.role);
  return typeof children === 'function' ? children({ user }) : children;
}
