import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Settings, Shield } from "lucide-react";

export default function DevDashboard() {
  const adminActions = [
    {
      title: "View All Users",
      description: "Manage user accounts and permissions",
      icon: Users,
      color: "bg-red-500",
      action: () => console.log("View all users"),
    },
    {
      title: "View All Jobs",
      description: "Monitor and manage job listings",
      icon: Briefcase,
      color: "bg-yellow-500",
      action: () => console.log("View all jobs"),
    },
    {
      title: "Edit Records",
      description: "Edit or delete system records",
      icon: Settings,
      color: "bg-purple-500",
      action: () => console.log("Edit records"),
    },
    {
      title: "System Settings",
      description: "Configure system-level settings",
      icon: Shield,
      color: "bg-blue-500",
      action: () => console.log("System settings"),
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
            Developer/Admin Dashboard 🧑‍💻
          </h1>
          <p className="text-gray-600">
            Full access granted. Manage all users, job listings, and
            system-level tasks.
          </p>
        </motion.div>

        {/* Admin Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={action.action}
              >
                <div className="flex items-center mb-4">
                  <div className={`${action.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">
                    {action.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* System Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            System Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
              <div className="text-gray-600">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">567</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">89</div>
              <div className="text-gray-600">Companies</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
