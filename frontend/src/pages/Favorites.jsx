import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Building2,
  Clock,
  DollarSign,
  Briefcase,
  Star,
  Share2,
  ArrowRight,
  Trash2,
  X,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { useJobContext } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const JobDetailsModal = ({ isOpen, onClose, jobData, user, hasAppliedToJob, applyToJob }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{jobData.title}</h2>
                  <p className="text-gray-600 mt-1">{jobData.company}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{jobData.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{jobData.type}</span>
                </div>
                {jobData.salary && (
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-5 h-5 mr-2" />
                    <span>{jobData.salary}</span>
                  </div>
                )}
                {jobData.experienceLevel && (
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{jobData.experienceLevel}</span>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 whitespace-pre-line">{jobData.description}</p>
                </div>

                {jobData.requirements && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
                    <p className="text-gray-600 whitespace-pre-line">{jobData.requirements}</p>
                  </div>
                )}

                {jobData.benefits && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Benefits</h3>
                    <p className="text-gray-600 whitespace-pre-line">{jobData.benefits}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end gap-4">
                {user && !hasAppliedToJob(jobData._id) && (
                  <button
                    onClick={() => {
                      applyToJob(jobData._id);
                      onClose();
                    }}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Quick Apply
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Favorites = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { favoriteIds, removeFromFavorites, applyToJob, hasAppliedToJob, jobs = [] } = useJobContext();
  const { user } = useAuth();

  // Get favorite jobs from the jobs array
  const favoriteJobs = jobs ? jobs.filter(job => favoriteIds.includes(job._id)) : [];

  // Filter favorite jobs based on search query
  const filteredJobs = favoriteJobs.filter(job => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
    );
  });

  const handleShareJob = (job) => {
    const jobUrl = `${window.location.origin}/jobs/${job._id}`;
    const shareData = {
      title: `Job Opportunity: ${job.title}`,
      text: `Check out this job: ${job.title} at ${job.company}`,
      url: jobUrl,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => toast.success('Job shared successfully'))
        .catch(() => {
          // Fallback to clipboard
          navigator.clipboard.writeText(`${job.title} at ${job.company}\n${jobUrl}`)
            .then(() => toast.success('Job link copied to clipboard'))
            .catch(() => toast.error('Failed to copy link'));
        });
    } else {
      // Fallback for browsers that don't support share API
      navigator.clipboard.writeText(`${job.title} at ${job.company}\n${jobUrl}`)
        .then(() => toast.success('Job link copied to clipboard'))
        .catch(() => toast.error('Failed to copy link'));
    }
  };

  // Refresh favorite jobs when favoriteIds in localStorage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'favoriteIds') {
        // Reload the page to refresh the favorites
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Favorite Jobs
            </h1>
            <p className="text-gray-600">
              Manage your saved jobs and applications
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        {favoriteJobs.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search saved jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {favoriteJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs yet</h3>
            <p className="text-gray-500 mb-4">Start saving jobs you're interested in by clicking the star icon</p>
            <Link
              to="/jobs"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Jobs
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredJobs.length} of {favoriteJobs.length} saved jobs
              </p>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{job.logo}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {job.title}
                          </h3>
                          {job.featured && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.posted}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {job.type}
                          </span>
                          {job.experienceLevel && (
                            <span className="flex items-center">
                              <Building2 className="w-4 h-4 mr-1" />
                              {job.experienceLevel}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-4 line-clamp-2">
                          {job.description}
                        </p>
                        {(job.skills || job.requirements) && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {(job.skills || job.requirements?.split(','))?.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                              >
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-semibold flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeFromFavorites(job._id)}
                              className="p-2 rounded-lg transition-colors text-yellow-500 bg-yellow-50 hover:bg-yellow-100"
                            >
                              <Star className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleShareJob(job)}
                              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                              title="Share job"
                            >
                              <Share2 size={20} />
                            </button>
                            {hasAppliedToJob(job._id) ? (
                              <span className="text-green-600 bg-green-50 px-4 py-2 rounded-lg text-sm font-medium">
                                Applied
                              </span>
                            ) : (
                              <button
                                onClick={() => applyToJob(job._id)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors mr-2"
                              >
                                Quick Apply
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setSelectedJob(job);
                                setShowModal(true);
                              }}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                              View Job
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Job Details Modal */}
            <JobDetailsModal
              isOpen={showModal}
              onClose={() => {
                setShowModal(false);
                setSelectedJob(null);
              }}
              jobData={selectedJob || {}}
              user={user}
              hasAppliedToJob={hasAppliedToJob}
              applyToJob={applyToJob}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
