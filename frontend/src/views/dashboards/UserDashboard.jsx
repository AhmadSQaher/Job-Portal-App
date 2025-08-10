import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { User, FileText, Search, Heart, Download, Upload } from "lucide-react";
import { useJobContext } from "../../context/JobContext";

export default function UserDashboard() {
  const { jobs, favoriteIds, appliedIds } = useJobContext();
  const fileInputRef = useRef();
  const { userResume, updateResume } = useAuth();
  const resume = userResume;

  // Listen for application updates
  React.useEffect(() => {
    const handleApplicationUpdate = () => {
      // Force a re-render to update the stats
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('applicationUpdated', handleApplicationUpdate);
    window.addEventListener('storage', handleApplicationUpdate);

    return () => {
      window.removeEventListener('applicationUpdated', handleApplicationUpdate);
      window.removeEventListener('storage', handleApplicationUpdate);
    };
  }, []);

  // Add state to force re-render when applications change
  const [forceUpdate, setForceUpdate] = React.useState(0);

  // Get favorite jobs and applied jobs by filtering the jobs array
  const favoriteJobs = jobs ? jobs.filter(job => favoriteIds.includes(job._id)) : [];
  const appliedJobs = jobs ? jobs.filter(job => appliedIds.includes(job._id)) : [];

  const handleResumeUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      console.log("📄 UserDashboard: Handling resume upload:", file.name);
      await updateResume(file);
      
      // No need to reload - the AuthContext will update the resume state automatically
      console.log("✅ UserDashboard: Resume uploaded successfully");
      
      // Clear the file input so the same file can be uploaded again if needed
      if (event.target) {
        event.target.value = '';
      }
    } catch (error) {
      console.error("❌ UserDashboard: Error uploading resume:", error);
      
      // More specific error messages
      if (error.message.includes('Not authenticated')) {
        alert('Authentication error. Please sign in again.');
      } else if (error.message.includes('Failed to upload resume')) {
        alert('Failed to upload resume. Please check your connection and try again.');
      } else {
        alert('Failed to upload resume. Please try again.');
      }
      
      // Clear the file input on error
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const stats = [
    {
      label: "Applications",
      value: appliedJobs.length.toString(),
      icon: FileText,
      color: "bg-blue-500",
    },
    { 
      label: "Saved Jobs", 
      value: favoriteJobs.length.toString(), 
      icon: Heart, 
      color: "bg-red-500" 
    },
    { 
      label: "Resume Status", 
      value: resume ? "✓ Uploaded" : "Not Uploaded", 
      icon: Upload, 
      color: resume ? "bg-green-500" : "bg-orange-500" 
    },
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

        {/* Resume Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Resume Management</h2>
              {resume ? (
                <div>
                  <p className="text-green-600 font-medium">✓ Resume uploaded</p>
                  <p className="text-gray-600 text-sm">{resume.originalName}</p>
                  {resume.uploadDate && (
                    <p className="text-gray-500 text-xs">
                      Uploaded on {new Date(resume.uploadDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-orange-600 font-medium">⚠ No resume uploaded</p>
                  <p className="text-gray-600 text-sm">Upload your resume to improve your job applications</p>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {resume && (
                <button
                  onClick={() => {
                    // Download resume from server
                    const token = localStorage.getItem('token');
                    if (token) {
                      window.open(`/api/users/${window.user?._id || 'me'}/resume`, '_blank');
                    }
                  }}
                  className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-medium">Download</span>
                </button>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-5 h-5 mr-2" />
                <span className="font-medium">{resume ? 'Update' : 'Upload'} Resume</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
