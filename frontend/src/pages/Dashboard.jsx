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

const Dashboard = () => {
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

  const recommendedJobs = [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "InnovationCo",
      location: "San Francisco, CA",
      salary: "$130k - $160k",
      logo: "💻",
    },
    {
      id: 2,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Remote",
      salary: "$120k - $150k",
      logo: "☁️",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "DataCorp",
      location: "New York, NY",
      salary: "$140k - $170k",
      logo: "📊",
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
                  <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Applications
            </h2>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div
                  key={application.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{application.logo}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {application.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {application.company}
                      </p>
                      <p className="text-xs text-gray-500">
                        {application.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      application.status === "Applied"
                        ? "bg-blue-100 text-blue-800"
                        : application.status === "Under Review"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recommended Jobs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recommended for You
            </h2>
            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{job.logo}</div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                        <p className="text-sm text-gray-500">{job.location}</p>
                        <p className="text-sm text-green-600 font-medium">
                          {job.salary}
                        </p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Building2 className="w-5 h-5 mr-2 text-blue-600" />
              <span>Browse Jobs</span>
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-5 h-5 mr-2 text-green-600" />
              <span>Update Profile</span>
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              <span>Schedule Interview</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
