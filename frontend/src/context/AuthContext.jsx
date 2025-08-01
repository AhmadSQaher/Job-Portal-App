import React from "react";

const API_BASE = "http://localhost:3000";

// Create context with error handling
const AuthContext = React.createContext ? React.createContext(null) : null;

export function useAuth() {
  if (!AuthContext) {
    throw new Error("React context not available");
  }
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (import.meta.env.DEV) {
      console.log(
        "🔍 AuthContext: Checking token on mount:",
        token ? "exists" : "none"
      );
    }

    if (token) {
      fetch(`${API_BASE}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Token invalid");
          }
          return res.json();
        })
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            console.log("✅ AuthContext: User restored from token:", data.user);
          } else {
            throw new Error("No user data");
          }
        })
        .catch((error) => {
          console.log(
            "❌ AuthContext: Token validation failed:",
            error.message
          );
          localStorage.removeItem("token");
          setUser(null);
        });
    } else {
      if (import.meta.env.DEV) {
        console.log("🔍 AuthContext: No token found, user is null");
      }
      setUser(null);
    }
  }, []);

  const signin = async (username, password) => {
    const res = await fetch(`${API_BASE}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }), // ✅ changed from email to username
    });

    const data = await res.json();
    if (import.meta.env.DEV) {
      console.log("🔐 Signin response:", data);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      console.log("👤 User set in context:", data.user);
      return data;
    }
    return { error: data.error };
  };

  const logout = async () => {
    console.log("🚪 AuthContext: Logging out user");

    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Call backend logout endpoint
        await fetch(`${API_BASE}/auth/signout`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.log("⚠️ Backend logout failed:", error);
    }

    // Clear frontend state regardless of backend response
    localStorage.removeItem("token");
    setUser(null);
    console.log("✅ AuthContext: User logged out, token cleared");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default React.memo(AuthProvider);
