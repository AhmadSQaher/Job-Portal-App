import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Users, FileText, TrendingUp } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "employer") {
      console.warn("User not authenticated — redirecting to signin");
      navigate("/signin");
    } else {
      fetchEmployerJobs();
    }
  }, [user, navigate]);

  const fetchEmployerJobs = async () => {
    if (!user || !user._id) {
      console.log('User not available for fetching jobs');
      setIsLoading(false);
      return;
    }

    try {
      const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';
      console.log('Fetching jobs for employer dashboard:', user._id);
      const response = await fetch(`${API_BASE}/api/jobs/employer/${user._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log('Dashboard response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Dashboard fetched jobs:', data);
        setJobs(data);
      } else {
        console.error('Failed to fetch jobs for dashboard:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching jobs for dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || user.role !== "employer") return null;

  const stats = [
    { label: "Active Jobs", value: isLoading ? "..." : jobs.length.toString(), icon: Briefcase, color: "bg-blue-500" },
    {
      label: "Total Applicants",
      value: "156",
      icon: Users,
      color: "bg-green-500",
    },
    {
      label: "New Applications",
      value: "12",
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      label: "Profile Views",
      value: "89",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  const actions = [
    {
      title: "Post a Job",
      description: "Create a new job listing",
      icon: Briefcase,
      action: () => navigate("/employer/post"),
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Manage Listings",
      description: "Edit your job postings",
      icon: FileText,
      action: () => navigate("/profile"),
      color: "bg-purple-600 hover:bg-purple-700",
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
            Employer Dashboard 🧑‍💼
          </h1>
          <p className="text-gray-600">
            From here you can post new jobs, view applicants, and manage your
            listings.
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

        {/* Actions Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                <div className="text-center">
                  <div
                    className={`${action.color} p-4 rounded-lg inline-block mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {action.description}
                  </p>
                  <button
                    onClick={action.action}
                    className={`${action.color} text-white px-6 py-2 rounded-lg font-medium transition-colors`}
                  >
                    {action.title}
                  </button>
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
