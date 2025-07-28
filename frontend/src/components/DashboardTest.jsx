import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Eye,
  Heart,
  Send,
  Building2,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";

const DashboardTest = () => {
  const stats = [
    { label: "Jobs Applied", value: "12", icon: Send, color: "bg-blue-500" },
    { label: "Profile Views", value: "45", icon: Eye, color: "bg-green-500" },
    { label: "Saved Jobs", value: "8", icon: Heart, color: "bg-red-500" },
    { label: "Interviews", value: "3", icon: Calendar, color: "bg-purple-500" },
  ];

  const recentApplications = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      status: "Applied",
      date: "2 days ago",
      logo: "🏢",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      status: "Under Review",
      date: "1 week ago",
      logo: "🚀",
    },
    {
      id: 3,
      title: "UX Designer",
      company: "DesignStudio",
      status: "Interview Scheduled",
      date: "2 weeks ago",
      logo: "🎨",
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
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <strong>Test Mode:</strong> This is a test dashboard that doesn't require authentication.
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your job search.
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
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Applications
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div
                key={application.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-4">{application.logo}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {application.title}
                    </h3>
                    <p className="text-sm text-gray-600">{application.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {application.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {application.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Send className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium">Apply to Jobs</span>
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Building2 className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-medium">Browse Companies</span>
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-5 h-5 text-purple-600 mr-2" />
              <span className="font-medium">Update Profile</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardTest; 