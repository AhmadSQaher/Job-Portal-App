// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, Building2, TrendingUp } from "lucide-react";

export default function Home() {
  const stats = [
    { label: "Active Jobs", value: "12,847", icon: TrendingUp },
    { label: "Companies", value: "2,156", icon: Building2 },
    { label: "Job Seekers", value: "45,231", icon: Users },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-left max-w-2xl">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                          <Link to="/">
                <img 
                  src="/LINXLogo.webp" 
                  alt="LINX Logo" 
                  width="64"
                  height="64"
                  className="logo-optimized"
                  onError={(e) => {
                    // Try assets path, then fallback
                    const currentSrc = e.target.src;
                    if (currentSrc.includes('/LINXLogo.webp') && !currentSrc.includes('/assets/')) {
                      e.target.src = '/assets/LINXLogo.webp';
                    } else {
                      // Replace with fallback div
                      const fallback = document.createElement('div');
                      fallback.className = 'w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center';
                      fallback.innerHTML = '<span class="text-white font-bold text-xl">L</span>';
                      e.target.parentNode.replaceChild(fallback, e.target);
                    }
                  }}
                />
              </Link>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Welcome to <span className="text-yellow-400">LINX</span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl mb-8 text-blue-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Connect. Hire. Grow. The portal that links talent to
                opportunity.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/jobs"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
                >
                  Browse Jobs
                </Link>
              </motion.div>
            </div>

            {/* Right side - Stats */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20"
                  >
                    <Icon className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-blue-100 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
