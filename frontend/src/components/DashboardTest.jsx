import React from "react";
import {
  TrendingUp,
  Eye,
  Heart,
  Send,
  Building2,
  Users,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";

const DashboardTest = () => {
  // Mock data for testing
  const stats = [
    { label: "Applications Sent", value: "12", icon: Send, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Profile Views", value: "47", icon: Eye, color: "text-green-600", bg: "bg-green-100" },
    { label: "Saved Jobs", value: "8", icon: Heart, color: "text-red-600", bg: "bg-red-100" },
    { label: "Interviews", value: "3", icon: Calendar, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const recentApplications = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      appliedDate: "2 days ago",
      status: "Under Review",
      salary: "$80,000 - $120,000",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "Remote",
      appliedDate: "1 week ago",
      status: "Interview Scheduled",
      salary: "$70,000 - $90,000",
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "New York, NY",
      appliedDate: "2 weeks ago",
      status: "Rejected",
      salary: "$90,000 - $130,000",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Interview Scheduled":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <strong>Test Mode:</strong> This is a test dashboard that doesn't require authentication.
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your job search overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div
                  key={application.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{application.title}</h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <Building2 className="w-4 h-4 mr-1" />
                        <span className="mr-4">{application.company}</span>
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="mr-4">{application.location}</span>
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>{application.salary}</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 md:mt-0 space-x-4">
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{application.appliedDate}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Send className="w-5 h-5 mr-2" />
                Browse Jobs
              </button>
              <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                <Heart className="w-5 h-5 mr-2" />
                View Saved Jobs
              </button>
              <button className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                <Users className="w-5 h-5 mr-2" />
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTest;

