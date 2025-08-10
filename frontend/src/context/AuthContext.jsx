import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userResume, setUserResume] = useState(null);

  // Initialize resume from localStorage if available
  useEffect(() => {
    const savedResumeName = localStorage.getItem("resumeName");
    if (savedResumeName) {
      console.log("🔍 Found saved resume name:", savedResumeName);
    }
  }, []);

  useEffect(() => {
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
            // Set resume information if available
            if (data.user.resume && data.user.resume.originalName) {
              setUserResume({
                filename: data.user.resume.filename,
                originalName: data.user.resume.originalName,
                uploadDate: data.user.resume.uploadDate
              });
              console.log("📄 AuthContext: Resume info loaded:", data.user.resume.originalName);
            } else {
              setUserResume(null);
              console.log("📄 AuthContext: No resume found for user");
            }
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
          setUserResume(null);
        });
    } else {
      if (import.meta.env.DEV) {
        console.log("🔍 AuthContext: No token found, user is null");
      }
      setUser(null);
      setUserResume(null);
    }
  }, []);

  const signin = async (username, password) => {
    const res = await fetch('/auth/signin', {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }), // ✅ changed from email to username
    });

    const data = await res.json();
    if (import.meta.env.DEV) {
      console.log("🔐 Signin response:", data);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      
      // Check if user has resume information
      if (data.user.resume && data.user.resume.originalName) {
        setUserResume({
          filename: data.user.resume.filename,
          originalName: data.user.resume.originalName,
          uploadDate: data.user.resume.uploadDate
        });
        console.log("📄 AuthContext: Resume info loaded on signin:", data.user.resume.originalName);
      } else {
        setUserResume(null);
        console.log("📄 AuthContext: No resume found on signin");
      }
      
      console.log("👤 User set in context:", data.user);
      return data;
    }
    return { error: data.error };
  };

  const updateResume = async (file) => {
    if (!file) {
      console.log("❌ AuthContext: No file provided to updateResume");
      return;
    }
    
    try {
      console.log("📄 AuthContext: Uploading resume:", file.name);
      
      const formData = new FormData();
      formData.append('resume', file);

      const token = localStorage.getItem('token');
      if (!token || !user || !user._id) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`/api/users/${user._id}/resume`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        console.error('❌ Resume upload failed:', errorMessage);
        throw new Error(`Failed to upload resume: ${errorMessage}`);
      }

      const data = await response.json();
      console.log("✅ AuthContext: Resume uploaded successfully:", data);
      
      // Update resume state with server response
      if (data.resume) {
        setUserResume({
          filename: data.resume.filename,
          originalName: data.resume.originalName,
          uploadDate: data.resume.uploadDate
        });
        console.log("📄 AuthContext: Resume state updated:", data.resume.originalName);
      } else {
        // Fallback: use file info if server doesn't return resume data
        setUserResume({
          originalName: file.name,
          uploadDate: new Date().toISOString()
        });
      }
      
      localStorage.setItem("resumeName", file.name);
    } catch (error) {
      console.error("❌ AuthContext: Error updating resume:", error);
      throw error;
    }
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
    localStorage.removeItem("resumeName");
    setUser(null);
    setUserResume(null);
    console.log("✅ AuthContext: User logged out, token and resume cleared");
  };

  const updateUser = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      if (!user || !user._id) {
        throw new Error("No user ID found");
      }

      console.log("🔄 Updating user with data:", updatedData);

      const response = await fetch(`${API_BASE}/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update user");
      }

      console.log("✅ User updated successfully:", data);
      
      // Update the local user state with the new data
      setUser({
        ...user,
        ...updatedData
      });
      
      return { success: true, user: data };
    } catch (error) {
      console.error("❌ Failed to update user:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      signin, 
      logout, 
      userResume, 
      updateResume,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}
