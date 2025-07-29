import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  Settings,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Code,
  Monitor,
  Zap,
  BarChart3,
  Activity,
  Globe,
  Server,
} from "lucide-react";

export default function DevDashboard() {
  const [systemStats, setSystemStats] = useState({
    cpu: 45,
    memory: 67,
    disk: 23,
    network: 89,
  });

  const [activeTab, setActiveTab] = useState("overview");

  const adminActions = [
    {
      title: "User Management",
      description: "Manage user accounts, permissions, and roles",
      icon: Users,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      action: () => console.log("User management"),
      status: "active",
    },
    {
      title: "Job Management",
      description: "Monitor and manage job listings and applications",
      icon: Briefcase,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      action: () => console.log("Job management"),
      status: "active",
    },
    {
      title: "System Configuration",
      description: "Configure system settings and preferences",
      icon: Settings,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      action: () => console.log("System configuration"),
      status: "active",
    },
    {
      title: "Security Center",
      description: "Monitor security and access controls",
      icon: Shield,
      color: "bg-gradient-to-r from-red-500 to-red-600",
      action: () => console.log("Security center"),
      status: "active",
    },
    {
      title: "Database Admin",
      description: "Manage database operations and backups",
      icon: Database,
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      action: () => console.log("Database admin"),
      status: "active",
    },
    {
      title: "API Management",
      description: "Monitor and manage API endpoints",
      icon: Code,
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      action: () => console.log("API management"),
      status: "active",
    },
    {
      title: "System Monitoring",
      description: "Real-time system performance monitoring",
      icon: Monitor,
      color: "bg-gradient-to-r from-pink-500 to-pink-600",
      action: () => console.log("System monitoring"),
      status: "active",
    },
    {
      title: "Performance Analytics",
      description: "View detailed performance metrics and reports",
      icon: BarChart3,
      color: "bg-gradient-to-r from-teal-500 to-teal-600",
      action: () => console.log("Performance analytics"),
      status: "active",
    },
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      message: "High CPU usage detected",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "info",
      message: "Database backup completed",
      time: "5 minutes ago",
    },
    {
      id: 3,
      type: "success",
      message: "New user registration",
      time: "10 minutes ago",
    },
    {
      id: 4,
      type: "error",
      message: "API rate limit warning",
      time: "15 minutes ago",
    },
  ];

  const performanceMetrics = [
    {
      label: "Response Time",
      value: "245ms",
      change: "-12%",
      status: "improving",
    },
    { label: "Uptime", value: "99.9%", change: "+0.1%", status: "stable" },
    { label: "Error Rate", value: "0.02%", change: "-5%", status: "improving" },
    { label: "Active Users", value: "1,234", change: "+8%", status: "growing" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Developer/Admin Dashboard 🧑‍💻
              </h1>
              <p className="text-gray-600 mt-1">
                Full system access and administrative controls
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Zap className="w-4 h-4 mr-2" />
                Quick Actions
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">
                  {metric.label}
                </h3>
                <span
                  className={`text-xs font-medium ${
                    metric.status === "improving"
                      ? "text-green-600"
                      : metric.status === "stable"
                      ? "text-blue-600"
                      : metric.status === "growing"
                      ? "text-purple-600"
                      : "text-gray-600"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: Activity },
                { id: "actions", label: "Quick Actions", icon: Zap },
                { id: "monitoring", label: "System Monitoring", icon: Monitor },
                { id: "alerts", label: "Alerts", icon: AlertTriangle },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* System Status */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    System Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Server className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="font-medium">Server Status</span>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Online
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Database className="w-5 h-5 text-green-600 mr-3" />
                        <span className="font-medium">Database</span>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Connected
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-purple-600 mr-3" />
                        <span className="font-medium">API Services</span>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Alerts */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Alerts
                  </h3>
                  <div className="space-y-3">
                    {systemAlerts.slice(0, 4).map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-3 ${
                            alert.type === "warning"
                              ? "bg-yellow-500"
                              : alert.type === "info"
                              ? "bg-blue-500"
                              : alert.type === "success"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-600">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "actions" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {adminActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-gray-300"
                      onClick={action.action}
                    >
                      <div
                        className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {action.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {action.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Access →
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {activeTab === "monitoring" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* CPU Usage */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      CPU Usage
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {systemStats.cpu}%
                      </span>
                      <span className="text-sm text-gray-600">Current</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${systemStats.cpu}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Memory Usage */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Memory Usage
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {systemStats.memory}%
                      </span>
                      <span className="text-sm text-gray-600">Current</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${systemStats.memory}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Disk Usage */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Disk Usage
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {systemStats.disk}%
                      </span>
                      <span className="text-sm text-gray-600">Current</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${systemStats.disk}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Network Usage */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Network Usage
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {systemStats.network}%
                      </span>
                      <span className="text-sm text-gray-600">Current</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${systemStats.network}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "alerts" && (
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`w-3 h-3 rounded-full mr-4 ${
                        alert.type === "warning"
                          ? "bg-yellow-500"
                          : alert.type === "info"
                          ? "bg-blue-500"
                          : alert.type === "success"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {alert.message}
                      </p>
                      <p className="text-sm text-gray-600">{alert.time}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
