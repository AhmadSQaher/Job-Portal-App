import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">L</span>
              <span className="text-lg font-semibold ml-1">LINX</span>
            </Link>
            <div className="hidden md:flex md:items-center md:ml-8 space-x-8">
              {!user && (
                <>
                  <Link to="/jobs" className="text-gray-700 hover:text-gray-900">
                    Find Jobs
                  </Link>
                  <Link to="/companies" className="text-gray-700 hover:text-gray-900">
                    Companies
                  </Link>
                </>
              )}
              {user && user.role === 'employer' && (
                <>
                  <Link to="/free-agents" className="text-gray-700 hover:text-gray-900">
                    Free Agents
                  </Link>
                  <Link to="/companies" className="text-gray-700 hover:text-gray-900">
                    Companies
                  </Link>
                  <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">
                    Dashboard
                  </Link>
                </>
              )}
              {user && user.role === 'user' && (
                <>
                  <Link to="/jobs" className="text-gray-700 hover:text-gray-900">
                    Find Jobs
                  </Link>
                  <Link to="/companies" className="text-gray-700 hover:text-gray-900">
                    Companies
                  </Link>
                  <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">
                    Dashboard
                  </Link>
                  <Link to="/favorites" className="text-blue-600 hover:text-blue-700">
                    Favorites
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">{user ? (
            <>

              <div className="flex items-center">
                <span className="text-gray-700">{user.name || "user"}</span>
                <button
                  onClick={handleLogout}
                  className="ml-4 text-gray-600 hover:text-gray-800"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
}
