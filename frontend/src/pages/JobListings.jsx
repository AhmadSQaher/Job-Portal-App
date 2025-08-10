import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useJobContext } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Filter,
  Star,
  Building2,
  Clock,
  DollarSign,
  Briefcase,
  X,
  Users,
  FileText,
  Share2,
} from "lucide-react";
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

const JobListings = () => {
  const location = useLocation();
  const companySearch = location.state?.companySearch || "";
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleShareJob = (job) => {
    const jobUrl = `${window.location.origin}/jobs/${job._id}`;
    const shareData = {
      title: `Job Opportunity: ${job.title || 'Untitled Job'}`,
      text: `Check out this job: ${job.title || 'Untitled Job'} at ${job.company || 'Unknown Company'}`,
      url: jobUrl,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => toast.success('Job shared successfully'))
        .catch(() => {
          // Fallback to clipboard
          navigator.clipboard.writeText(`${job.title || 'Untitled Job'} at ${job.company || 'Unknown Company'}\n${jobUrl}`)
            .then(() => toast.success('Job link copied to clipboard'))
            .catch(() => toast.error('Failed to copy link'));
        });
    } else {
      // Fallback for browsers that don't support share API
      navigator.clipboard.writeText(`${job.title || 'Untitled Job'} at ${job.company || 'Unknown Company'}\n${jobUrl}`)
        .then(() => toast.success('Job link copied to clipboard'))
        .catch(() => toast.error('Failed to copy link'));
    }
  };
  
  const [searchQuery, setSearchQuery] = useState(companySearch);
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of job listings
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (companySearch) {
      setSearchQuery(companySearch);
    }
  }, [companySearch]);

  // Reset to first page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, locationQuery, selectedCategory, selectedTypes, selectedExperience]);
  const { jobs, addToFavorites, removeFromFavorites, applyToJob, isJobFavorited, hasAppliedToJob } = useJobContext();

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "technology", name: "Technology" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "product", name: "Product" },
    { id: "finance", name: "Finance" },
  ];

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleExperienceChange = (level) => {
    setSelectedExperience(prev => {
      if (prev.includes(level)) {
        return prev.filter(l => l !== level);
      } else {
        return [...prev, level];
      }
    });
  };

  const availableJobs = jobs || [];
  const filteredJobs = availableJobs.filter((job) => {
    const matchesSearch =
      (job.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.company || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      locationQuery === "" ||
      (job.location || '').toLowerCase().includes(locationQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      (job.category || '').toLowerCase() === selectedCategory.toLowerCase();
    const matchesType = 
      selectedTypes.length === 0 || 
      selectedTypes.includes(job.type);
    const matchesExperience = 
      selectedExperience.length === 0 ||
      (job.experienceLevel && selectedExperience.includes(job.experienceLevel));

    return matchesSearch && matchesLocation && matchesCategory && matchesType && matchesExperience;
  });

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
              Find Your Next Job
            </h1>
            <p className="text-gray-600">
              Discover thousands of job opportunities
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <div className="space-y-2">
                  {["Full-time", "Part-time", "Contract", "Internship"].map(
                    (type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => handleTypeChange(type)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {type}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <div className="space-y-2">
                  {["Entry Level", "Mid Level", "Senior", "Executive"].map(
                    (level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedExperience.includes(level)}
                          onChange={() => handleExperienceChange(level)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {level}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {Math.min(currentPage * jobsPerPage, filteredJobs.length)} of {filteredJobs.length} jobs
              </p>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage).map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{job.logo || '🏢'}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {job.title || 'Untitled Job'}
                        </h3>
                        <p className="text-gray-700 font-medium mb-2">{job.company || 'Unknown Company'}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location || 'Location not specified'}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {job.type || 'Type not specified'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">
                          {job.description || 'No description available'}
                        </p>
                        <div className="flex items-center justify-between">
                          {job.salary && (
                            <span className="text-green-600 font-semibold text-lg flex items-center">
                              {!job.salary.startsWith('$') && <DollarSign className="w-5 h-5 mr-1" />}
                              {job.salary}
                            </span>
                          )}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleShareJob(job)}
                              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                              title="Share job"
                            >
                              <Share2 className="w-5 h-5" />
                            </button>
                            {user && (
                              <button
                                onClick={() => isJobFavorited(job._id) ? removeFromFavorites(job._id) : addToFavorites(job._id)}
                                className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                                title={isJobFavorited(job._id) ? "Remove from favorites" : "Add to favorites"}
                              >
                                <Star className={`w-5 h-5 ${isJobFavorited(job._id) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                              </button>
                            )}
                            {user && !hasAppliedToJob(job._id) && (
                              <button
                                onClick={() => applyToJob(job._id)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                              >
                                Quick Apply
                              </button>
                            )}
                            {user && hasAppliedToJob(job._id) && (
                              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium">
                                Applied
                              </span>
                            )}
                            {!user && (
                              <Link
                                to="/login"
                                state={{ from: location.pathname }}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                              >
                                Sign in to Apply
                              </Link>
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

              {/* Pagination */}
              {filteredJobs.length > jobsPerPage && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button 
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={`px-3 py-2 ${currentPage === 1 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-500 hover:text-gray-700 border border-gray-300'} rounded-lg`}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {[...Array(Math.ceil(filteredJobs.length / jobsPerPage))].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-2 ${currentPage === index + 1 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-700 hover:text-gray-900 border border-gray-300'} rounded-lg`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button 
                      onClick={() => currentPage < Math.ceil(filteredJobs.length / jobsPerPage) && handlePageChange(currentPage + 1)}
                      className={`px-3 py-2 ${currentPage === Math.ceil(filteredJobs.length / jobsPerPage)
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:text-gray-700 border border-gray-300'} rounded-lg`}
                      disabled={currentPage === Math.ceil(filteredJobs.length / jobsPerPage)}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default JobListings;
