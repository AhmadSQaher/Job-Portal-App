import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  Briefcase,
  Shield,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
  Plus,
  Settings,
  UserPlus,
  UserMinus,
  Ban,
  Unlock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Activity,
  BarChart3,
  PieChart,
  Database,
  Server,
  Globe,
  Zap,
  Target,
  Award,
  TrendingDown,
  AlertTriangle,
  Info,
  X,
  Save,
  RotateCcw,
  Filter as FilterIcon,
  Download as DownloadIcon,
  Upload,
  EyeOff,
  Eye as EyeIcon,
  Lock,
  Unlock as UnlockIcon,
  Shield as ShieldIcon,
  AlertTriangle as AlertTriangleIcon,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Copy,
  ExternalLink,
  FileText,
  PieChart as PieChartIcon,
  LineChart,
  ScatterChart,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Users as UsersIcon,
  Briefcase as BriefcaseIcon,
  Building2 as Building2Icon,
  Globe as GlobeIcon,
  Wifi,
  WifiOff,
  HardDrive,
  Cpu,
  Memory,
  HardDrive as HardDriveIcon,
  Network,
  Database as DatabaseIcon,
  Server as ServerIcon,
  Shield as ShieldIcon2,
  Key,
  Key as KeyIcon,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Tablet,
  Globe as GlobeIcon2,
  Map,
  Navigation,
  Compass,
  Target as TargetIcon,
  Crosshair,
  Zap as ZapIcon,
  Lightning,
  Power,
  PowerOff,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Volume,
  Volume1,
  Volume3,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Camera,
  CameraOff,
  Image,
  File,
  Folder,
  FolderOpen,
  FilePlus,
  FileMinus,
  FileX,
  FileCheck,
  FileText as FileTextIcon,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  FilePresentation,
  FilePdf,
  FileWord,
  FileExcel,
  FilePowerpoint,
  FileZip,
  FileRar,
  File7z,
  FileTxt,
  FileCsv,
  FileJson,
  FileXml,
  FileHtml,
  FileCss,
  FileJs,
  FileTs,
  FileJsx,
  FileTsx,
  FileVue,
  FileReact,
  FileAngular,
  FileNode,
  FilePython,
  FileJava,
  FileC,
  FileCpp,
  FileCsharp,
  FilePhp,
  FileRuby,
  FileGo,
  FileRust,
  FileSwift,
  FileKotlin,
  FileDart,
  FileFlutter,
  FileReact as FileReactIcon,
  FileVue as FileVueIcon,
  FileAngular as FileAngularIcon,
  FileNode as FileNodeIcon,
  FilePython as FilePythonIcon,
  FileJava as FileJavaIcon,
  FileC as FileCIcon,
  FileCpp as FileCppIcon,
  FileCsharp as FileCsharpIcon,
  FilePhp as FilePhpIcon,
  FileRuby as FileRubyIcon,
  FileGo as FileGoIcon,
  FileRust as FileRustIcon,
  FileSwift as FileSwiftIcon,
  FileKotlin as FileKotlinIcon,
  FileDart as FileDartIcon,
  FileFlutter as FileFlutterIcon,
} from "lucide-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [advancedFilters, setAdvancedFilters] = useState({
    dateRange: "all",
    role: "all",
    status: "all",
    location: "all",
    category: "all",
  });
  const [analyticsData, setAnalyticsData] = useState({
    userGrowth: [],
    jobTrends: [],
    employerStats: [],
    systemMetrics: [],
    userBehavior: [],
    revenueData: [],
    geographicData: [],
    deviceStats: [],
    browserStats: [],
    osStats: [],
  });
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalEmployers: 0,
    verifiedEmployers: 0,
    systemUptime: "99.9%",
    lastBackup: "2 hours ago",
    cpuUsage: "45%",
    memoryUsage: "62%",
    diskUsage: "78%",
    networkTraffic: "1.2GB/s",
    activeConnections: 1247,
    errorRate: "0.02%",
    responseTime: "120ms",
    databaseConnections: 89,
    cacheHitRate: "94%",
    queueSize: 23,
  });

  const token = localStorage.getItem("token");

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

        // Calculate system stats
        setSystemStats({
          totalUsers: usersData.length,
          activeUsers: usersData.filter((u) => u.status !== "suspended").length,
          totalJobs: jobsData.length,
          activeJobs: jobsData.filter((j) => j.status === "active").length,
          totalEmployers: employersData.length,
          verifiedEmployers: employersData.filter((e) => e.verified).length,
          systemUptime: "99.9%",
          lastBackup: "2 hours ago",
          cpuUsage: "45%",
          memoryUsage: "62%",
          diskUsage: "78%",
          networkTraffic: "1.2GB/s",
          activeConnections: 1247,
          errorRate: "0.02%",
          responseTime: "120ms",
          databaseConnections: 89,
          cacheHitRate: "94%",
          queueSize: 23,
        });

        // Generate mock analytics data
        generateAnalyticsData(usersData, jobsData, employersData);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const generateAnalyticsData = (usersData, jobsData, employersData) => {
    // User growth over time
    const userGrowth = [
      { month: "Jan", users: 120, growth: 12 },
      { month: "Feb", users: 145, growth: 21 },
      { month: "Mar", users: 178, growth: 23 },
      { month: "Apr", users: 210, growth: 18 },
      { month: "May", users: 245, growth: 17 },
      { month: "Jun", users: 280, growth: 14 },
    ];

    // Job trends
    const jobTrends = [
      { month: "Jan", posted: 45, filled: 32, rate: 71 },
      { month: "Feb", posted: 52, filled: 38, rate: 73 },
      { month: "Mar", posted: 61, filled: 45, rate: 74 },
      { month: "Apr", posted: 58, filled: 43, rate: 74 },
      { month: "May", posted: 67, filled: 51, rate: 76 },
      { month: "Jun", posted: 73, filled: 56, rate: 77 },
    ];

    // Geographic data
    const geographicData = [
      { country: "USA", users: 45, jobs: 67, employers: 23 },
      { country: "Canada", users: 23, jobs: 34, employers: 12 },
      { country: "UK", users: 18, jobs: 28, employers: 9 },
      { country: "Germany", users: 15, jobs: 22, employers: 7 },
      { country: "Australia", users: 12, jobs: 19, employers: 6 },
    ];

    // Device statistics
    const deviceStats = [
      { device: "Desktop", users: 65, percentage: 65 },
      { device: "Mobile", users: 28, percentage: 28 },
      { device: "Tablet", users: 7, percentage: 7 },
    ];

    setAnalyticsData({
      userGrowth,
      jobTrends,
      geographicData,
      deviceStats,
      userBehavior: [],
      revenueData: [],
      employerStats: [],
      systemMetrics: [],
      browserStats: [],
      osStats: [],
    });
  };

  const stats = [
    {
      label: "Total Users",
      value: systemStats.totalUsers,
      icon: Users,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      change: "+12%",
      changeType: "positive",
      detail: `${systemStats.activeUsers} active`,
    },
    {
      label: "Employers",
      value: systemStats.totalEmployers,
      icon: Building2,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      change: "+8%",
      changeType: "positive",
      detail: `${systemStats.verifiedEmployers} verified`,
    },
    {
      label: "Active Jobs",
      value: systemStats.totalJobs,
      icon: Briefcase,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      change: "+15%",
      changeType: "positive",
      detail: `${systemStats.activeJobs} active`,
    },
    {
      label: "System Status",
      value: "Online",
      icon: Shield,
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      change: systemStats.systemUptime,
      changeType: "neutral",
      detail: systemStats.lastBackup,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New user registered",
      user: "John Doe",
      time: "2 minutes ago",
      type: "user",
      severity: "info",
    },
    {
      id: 2,
      action: "Job posted",
      user: "TechCorp",
      time: "5 minutes ago",
      type: "job",
      severity: "success",
    },
    {
      id: 3,
      action: "Employer verified",
      user: "StartupXYZ",
      time: "10 minutes ago",
      type: "employer",
      severity: "success",
    },
    {
      id: 4,
      action: "User suspended",
      user: "SpamUser",
      time: "15 minutes ago",
      type: "user",
      severity: "warning",
    },
    {
      id: 5,
      action: "System backup completed",
      user: "System",
      time: "1 hour ago",
      type: "system",
      severity: "info",
    },
    {
      id: 6,
      action: "High traffic detected",
      user: "System",
      time: "2 hours ago",
      type: "system",
      severity: "warning",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = jobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserAction = async (action, userId) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/${action}`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error(`Error performing ${action} on user:`, error);
    }
  };

  const handleBulkAction = async (action, userIds) => {
    try {
      const response = await fetch(`/api/admin/users/bulk/${action}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIds }),
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error(`Error performing bulk ${action}:`, error);
    }
  };

  const handleJobAction = async (action, jobId) => {
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/${action}`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error(`Error performing ${action} on job:`, error);
    }
  };

  const exportData = (type) => {
    const data = type === "users" ? users : type === "jobs" ? jobs : employers;
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(data[0] || {}).join(",") +
      "\n" +
      data.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${type}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-gray-600 text-lg font-medium">
            Loading admin dashboard...
          </p>
          <p className="mt-2 text-gray-500">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Complete control over your LINX job portal platform
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </button>
              <div className="relative">
                <button
                  onClick={() => exportData("users")}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </button>
              </div>
              <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 mt-1">{stat.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: Activity },
                { id: "users", label: "User Management", icon: Users },
                { id: "jobs", label: "Job Management", icon: Briefcase },
                {
                  id: "employers",
                  label: "Employer Management",
                  icon: Building2,
                },
                {
                  id: "analytics",
                  label: "Advanced Analytics",
                  icon: BarChart3,
                },
                { id: "system", label: "System Control", icon: Settings },
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
            {/* Search and Filter */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
                <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FilterIcon className="w-4 h-4 mr-2" />
                  Advanced Filters
                </button>
              </div>
              <div className="flex items-center space-x-2">
                {activeTab === "users" && (
                  <>
                    <button
                      onClick={() => setShowUserModal(true)}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add User
                    </button>
                    {selectedUsers.length > 0 && (
                      <button
                        onClick={() =>
                          handleBulkAction("suspend", selectedUsers)
                        }
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Ban className="w-4 h-4 mr-2" />
                        Suspend Selected
                      </button>
                    )}
                  </>
                )}
                {activeTab === "jobs" && (
                  <>
                    <button
                      onClick={() => setShowJobModal(true)}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Job
                    </button>
                    {selectedJobs.length > 0 && (
                      <button
                        onClick={() =>
                          handleBulkAction("approve", selectedJobs)
                        }
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve Selected
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center p-4 bg-gray-50 rounded-lg"
                      >
                        <div
                          className={`w-3 h-3 rounded-full mr-3 ${
                            activity.severity === "warning"
                              ? "bg-yellow-500"
                              : activity.severity === "success"
                              ? "bg-green-500"
                              : activity.severity === "error"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-600">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setShowUserModal(true)}
                      className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
                    >
                      <UserPlus className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="font-medium text-gray-900">Add User</p>
                      <p className="text-sm text-gray-600">
                        Create new user account
                      </p>
                    </button>
                    <button
                      onClick={() => setShowJobModal(true)}
                      className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left"
                    >
                      <Plus className="w-6 h-6 text-green-600 mb-2" />
                      <p className="font-medium text-gray-900">Post Job</p>
                      <p className="text-sm text-gray-600">
                        Create new job listing
                      </p>
                    </button>
                    <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left">
                      <Building2 className="w-6 h-6 text-purple-600 mb-2" />
                      <p className="font-medium text-gray-900">Add Employer</p>
                      <p className="text-sm text-gray-600">
                        Register new company
                      </p>
                    </button>
                    <button className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-left">
                      <Settings className="w-6 h-6 text-orange-600 mb-2" />
                      <p className="font-medium text-gray-900">
                        System Settings
                      </p>
                      <p className="text-sm text-gray-600">
                        Configure platform
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-8">
                {/* User Growth Chart */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    User Growth Trends
                  </h3>
                  <div className="grid grid-cols-6 gap-4">
                    {analyticsData.userGrowth.map((data, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-blue-100 rounded-lg p-3 mb-2">
                          <p className="text-2xl font-bold text-blue-600">
                            {data.users}
                          </p>
                          <p className="text-sm text-gray-600">{data.month}</p>
                        </div>
                        <p className="text-xs text-green-600">
                          +{data.growth}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job Trends */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Job Posting Trends
                  </h3>
                  <div className="grid grid-cols-6 gap-4">
                    {analyticsData.jobTrends.map((data, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-green-100 rounded-lg p-3 mb-2">
                          <p className="text-2xl font-bold text-green-600">
                            {data.posted}
                          </p>
                          <p className="text-sm text-gray-600">{data.month}</p>
                        </div>
                        <p className="text-xs text-blue-600">
                          {data.filled} filled
                        </p>
                        <p className="text-xs text-purple-600">
                          {data.rate}% rate
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Geographic Distribution */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Geographic Distribution
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    {analyticsData.geographicData.map((data, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-purple-100 rounded-lg p-3 mb-2">
                          <p className="text-lg font-bold text-purple-600">
                            {data.country}
                          </p>
                          <p className="text-sm text-gray-600">
                            {data.users} users
                          </p>
                        </div>
                        <p className="text-xs text-gray-600">
                          {data.jobs} jobs • {data.employers} employers
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Device Statistics */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Device Usage Statistics
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {analyticsData.deviceStats.map((data, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-orange-100 rounded-lg p-3 mb-2">
                          <p className="text-2xl font-bold text-orange-600">
                            {data.percentage}%
                          </p>
                          <p className="text-sm text-gray-600">{data.device}</p>
                        </div>
                        <p className="text-xs text-gray-600">
                          {data.users} users
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advanced Analytics Controls */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Advanced Analytics Controls
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left">
                      <TrendingUp className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="font-medium text-gray-900">
                        Generate Report
                      </p>
                      <p className="text-sm text-gray-600">
                        Create detailed analytics
                      </p>
                    </button>
                    <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left">
                      <Download className="w-6 h-6 text-green-600 mb-2" />
                      <p className="font-medium text-gray-900">Export Data</p>
                      <p className="text-sm text-gray-600">
                        Download analytics
                      </p>
                    </button>
                    <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left">
                      <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
                      <p className="font-medium text-gray-900">Custom Charts</p>
                      <p className="text-sm text-gray-600">
                        Create visualizations
                      </p>
                    </button>
                    <button className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-left">
                      <Target className="w-6 h-6 text-orange-600 mb-2" />
                      <p className="font-medium text-gray-900">Set Alerts</p>
                      <p className="text-sm text-gray-600">
                        Configure notifications
                      </p>
                    </button>
                  </div>
                </div>

                {/* Real-time Monitoring */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Real-time Monitoring
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Active Users</p>
                          <p className="text-2xl font-bold">1,247</p>
                        </div>
                        <Users className="w-8 h-8 opacity-80" />
                      </div>
                      <div className="mt-2">
                        <p className="text-xs opacity-90">
                          +12% from last hour
                        </p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Jobs Posted</p>
                          <p className="text-2xl font-bold">73</p>
                        </div>
                        <Briefcase className="w-8 h-8 opacity-80" />
                      </div>
                      <div className="mt-2">
                        <p className="text-xs opacity-90">+8% from last hour</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">System Load</p>
                          <p className="text-2xl font-bold">45%</p>
                        </div>
                        <Activity className="w-8 h-8 opacity-80" />
                      </div>
                      <div className="mt-2">
                        <p className="text-xs opacity-90">Normal operation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(filteredUsers.map((u) => u._id));
                            } else {
                              setSelectedUsers([]);
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers([...selectedUsers, user._id]);
                              } else {
                                setSelectedUsers(
                                  selectedUsers.filter((id) => id !== user._id)
                                );
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                            <div className="text-xs text-gray-400">
                              @{user.username}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-800"
                                : user.role === "dev"
                                ? "bg-purple-100 text-purple-800"
                                : user.role === "employer"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === "suspended"
                                ? "bg-red-100 text-red-800"
                                : user.status === "inactive"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.status === "suspended" ? (
                              <Ban className="w-3 h-3 mr-1" />
                            ) : user.status === "inactive" ? (
                              <Clock className="w-3 h-3 mr-1" />
                            ) : (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            )}
                            {user.status || "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setEditingUser(user);
                                setShowUserModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit User"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleUserAction("suspend", user._id)
                              }
                              className="text-yellow-600 hover:text-yellow-900"
                              title="Suspend User"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleUserAction("activate", user._id)
                              }
                              className="text-green-600 hover:text-green-900"
                              title="Activate User"
                            >
                              <Unlock className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleUserAction("delete", user._id)
                              }
                              className="text-red-600 hover:text-red-900"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "jobs" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedJobs(filteredJobs.map((j) => j._id));
                            } else {
                              setSelectedJobs([]);
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredJobs.map((job) => (
                      <tr key={job._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedJobs.includes(job._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedJobs([...selectedJobs, job._id]);
                              } else {
                                setSelectedJobs(
                                  selectedJobs.filter((id) => id !== job._id)
                                );
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {job.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {job.company}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {job.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {job.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                              job.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : job.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {job.status === "pending" ? (
                              <Clock className="w-3 h-3 mr-1" />
                            ) : job.status === "rejected" ? (
                              <X className="w-3 h-3 mr-1" />
                            ) : (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            )}
                            {job.status || "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setEditingJob(job);
                                setShowJobModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit Job"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleJobAction("approve", job._id)
                              }
                              className="text-green-600 hover:text-green-900"
                              title="Approve Job"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleJobAction("reject", job._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Reject Job"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleJobAction("delete", job._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Job"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "employers" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employers.map((employer) => (
                  <div key={employer._id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {employer.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {employer.company}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {employer.email}
                      </div>
                      {employer.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {employer.phone}
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                            employer.verified
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {employer.verified ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {employer.verified ? "Verified" : "Pending"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                      <button className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-2 bg-red-200 text-red-700 text-sm rounded-lg hover:bg-red-300 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "system" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      System Status
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Server className="w-5 h-5 text-blue-600 mr-3" />
                          <span className="font-medium">Server</span>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Online
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Database className="w-5 h-5 text-green-600 mr-3" />
                          <span className="font-medium">Database</span>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 text-purple-600 mr-3" />
                          <span className="font-medium">API</span>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      System Actions
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Restart Services
                      </button>
                      <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Create Backup
                      </button>
                      <button className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <Settings className="w-4 h-4 mr-2" />
                        System Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingUser ? "Edit User" : "Add New User"}
              </h3>
              <button
                onClick={() => {
                  setShowUserModal(false);
                  setEditingUser(null);
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={editingUser?.name || ""}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={editingUser?.email || ""}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  defaultValue={editingUser?.role || "user"}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">User</option>
                  <option value="employer">Employer</option>
                  <option value="dev">Developer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowUserModal(false);
                    setEditingUser(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingUser ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingJob ? "Edit Job" : "Add New Job"}
              </h3>
              <button
                onClick={() => {
                  setShowJobModal(false);
                  setEditingJob(null);
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  defaultValue={editingJob?.title || ""}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  defaultValue={editingJob?.category || "Tech"}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Tech">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Design">Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  defaultValue={editingJob?.location || ""}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowJobModal(false);
                    setEditingJob(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingJob ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
