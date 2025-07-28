import React from "react";
import { motion } from "framer-motion";
import { User, FileText, Search, Heart } from "lucide-react";

export default function UserDashboard() {
  const stats = [
    {
      label: "Applications",
      value: "12",
      icon: FileText,
      color: "bg-blue-500",
    },
    { label: "Saved Jobs", value: "8", icon: Heart, color: "bg-red-500" },
    { label: "Profile Views", value: "45", icon: User, color: "bg-green-500" },
    {
      label: "Job Searches",
      value: "23",
      icon: Search,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Dashboard 🧑‍💼
          </h1>
          <p className="text-gray-600">
            Here, job seekers can edit their profile, post resumes, and explore
            jobs.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Search className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-medium">Browse Jobs</span>
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-medium">Update Resume</span>
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-medium">Edit Profile</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
