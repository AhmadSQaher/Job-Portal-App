import React, { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoImage from "./LogoImage";
import {
  Search,
  Menu,
  X,
  User,
  Building2,
  LayoutDashboard,
  LogOut,
  Star,
} from "lucide-react";
// import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";
import { useJobContext } from "../context/JobContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { favoriteCount, applicationCount } = useJobContext();

  const navigation = useMemo(() => {
    const getDashboardLink = () => {
      if (!user) return "/dashboard";
      if (user.role === "dev" || user.role === "admin") return "/dev/dashboard";
      if (user.role === "employer") return "/employer/dashboard";
      if (user.role === "user") return "/user/dashboard";
      return "/dashboard";
    };

    const dashboardLink = getDashboardLink();
    if (import.meta.env.DEV) {
      console.log("🔗 Dashboard link for user:", user?.role, "->", dashboardLink);
    }

    const baseNavigation = [
      { name: "Companies", href: "/companies", icon: Building2 },
    ];

    // Add role-specific navigation items
    if (user) {
      if (user.role === 'employer') {
        return [
          { name: "Free Agents", href: "/free-agents", icon: Search },
          ...baseNavigation,
          { 
            name: "Dashboard", 
            href: dashboardLink, 
            icon: LayoutDashboard,
            badge: applicationCount ? applicationCount : undefined 
          }
        ];
      } else {
        return [
          { name: "Find Jobs", href: "/jobs", icon: Search },
          ...baseNavigation,
          { 
            name: "Dashboard", 
            href: dashboardLink, 
            icon: LayoutDashboard,
            badge: applicationCount ? applicationCount : undefined 
          },
          { 
            name: "Favorites", 
            href: "/favorites", 
            icon: Star,
            badge: favoriteCount ? favoriteCount : undefined 
          }
        ];
      }
    }
    
    // Navigation for non-logged-in users
    return [
      { name: "Find Jobs", href: "/jobs", icon: Search },
      ...baseNavigation
    ];
  }, [user]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <LogoImage 
              className="w-10 h-10 object-contain"
              width="40"
              height="40"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">LINX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {user.role === "employer" && (
                  <Link
                    to="/post-job"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Post a Job
                  </Link>
                )}
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {user.role}
                </span>
                <Link
                  to="/profile"
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  Not signed in
                </span>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-100 bg-white"
        >
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Mobile Authentication Links */}
            {user ? (
              <>
                {user.role === "employer" && (
                  <Link
                    to="/post-job"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Building2 className="w-5 h-5" />
                    <span>Post a Job</span>
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
