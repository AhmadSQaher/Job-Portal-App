import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Building2, Briefcase, Shield } from "lucide-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem("jwt")).token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, employersRes, jobsRes] = await Promise.all([
          fetch("/api/admin/users", {
            headers: { Authorization: "Bearer " + token },
          }),
          fetch("/api/admin/employers", {
            headers: { Authorization: "Bearer " + token },
          }),
          fetch("/api/admin/jobs", {
            headers: { Authorization: "Bearer " + token },
          }),
        ]);

        const usersData = await usersRes.json();
        const employersData = await employersRes.json();
        const jobsData = await jobsRes.json();

        setUsers(usersData);
        setEmployers(employersData);
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Employers",
      value: employers.length,
      icon: Building2,
      color: "bg-green-500",
    },
    {
      label: "Active Jobs",
      value: jobs.length,
      icon: Briefcase,
      color: "bg-purple-500",
    },
    {
      label: "System Status",
      value: "Online",
      icon: Shield,
      color: "bg-green-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin data...</p>
        </div>
      </div>
    );
  }

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
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage users, employers, and job listings across the platform.
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

        {/* Data Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Users Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Users ({users.length})
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="border-b border-gray-100 pb-3 last:border-b-0"
                >
                  <p className="font-medium text-gray-900">
                    {user.name} ({user.role})
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Employers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-green-600" />
              Employers ({employers.length})
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {employers.map((emp) => (
                <div
                  key={emp._id}
                  className="border-b border-gray-100 pb-3 last:border-b-0"
                >
                  <p className="font-medium text-gray-900">
                    {emp.name} - {emp.company}
                  </p>
                  <p className="text-sm text-gray-600">{emp.email}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Jobs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
              Jobs ({jobs.length})
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="border-b border-gray-100 pb-3 last:border-b-0"
                >
                  <p className="font-medium text-gray-900">{job.title}</p>
                  <p className="text-sm text-gray-600">
                    {job.category} • {job.location}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
