import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Filter,
  Star,
  Building2,
  Clock,
  DollarSign,
  Search,
  Briefcase,
  Briefcase as JobType,
  GraduationCap as Experience,
} from "lucide-react";
import { toast } from "react-hot-toast";

const sampleJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    type: "Full-time",
    category: "Technology",
    experienceLevel: "Senior Level",
    logo: "🏢",
    featured: true,
    posted: "2 days ago",
    description:
      "We are looking for a talented Frontend Developer to join our team...",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$100k - $130k",
    type: "Full-time",
    category: "Product",
    logo: "🚀",
    featured: true,
    posted: "1 day ago",
    description: "Join our fast-growing startup as a Product Manager...",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignStudio",
    location: "Austin, TX",
    salary: "$80k - $110k",
    type: "Full-time",
    category: "Design",
    logo: "🎨",
    featured: false,
    posted: "3 days ago",
    description: "Create beautiful and intuitive user experiences...",
  },
  // ... more sample jobs
];

const JobListings = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState(sampleJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  // Effect to handle company parameter from URL
  useEffect(() => {
    const companyParam = searchParams.get('company');
    if (companyParam) {
      setSearchQuery(decodeURIComponent(companyParam));
    }
  }, [searchParams]);
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const saved = localStorage.getItem('favoriteIds');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleToggleFavorite = (job) => {
    if (!job) {
      console.warn('Attempted to toggle favorite on undefined job');
      return;
    }
    
    // Use _id for MongoDB documents, fallback to id for sample data
    const jobId = String(job._id || job.id);
    if (!jobId) {
      console.warn('Attempted to toggle favorite on job with no ID');
      toast.error('Unable to favorite this job');
      return;
    }
    
    setFavoriteIds(prevIds => {
      const isCurrentlyFavorited = prevIds.includes(jobId);
      
      if (isCurrentlyFavorited) {
        toast.success('Removed from favorites');
        return prevIds.filter(id => id !== jobId);
      } else {
        toast.success('Added to favorites');
        return [...prevIds, jobId];
      }
    });
  };

  const isFavorite = (job) => {
    if (!job) return false;
    const jobId = String(job._id || job.id);
    if (!jobId) return false;
    return favoriteIds.includes(jobId);
  };

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favoriteIds]);

  const [filters, setFilters] = useState({
    category: "All",
    jobType: "All",
    experienceLevel: "All",
    salaryRange: "All",
  });
  const [filteredJobs, setFilteredJobs] = useState(sampleJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/jobs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs. Using sample data instead.");
        // Keep using sample data if API fails
        setJobs(sampleJobs);
        setFilteredJobs(sampleJobs);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);



  // Helper function to match salary range
  const matchSalaryRange = (jobSalary, filterRange) => {
    if (!jobSalary || filterRange === "All") return true;
    
    try {
      // Extract the first number found in the salary string
      const salaryMatch = jobSalary.match(/\d+/);
      if (!salaryMatch) return false;
      
      const salary = parseInt(salaryMatch[0]) * 1000; // Convert k to actual value
      
      if (filterRange === "150k+") return salary >= 150000;
      
      const [min, max] = filterRange.split("-").map(s => parseInt(s));
      if (!min || !max) return true; // Invalid range format, don't filter
      
      return salary >= min * 1000 && salary <= max * 1000;
    } catch (error) {
      console.error('Error matching salary range:', error);
      return true; // On error, don't filter out the job
    }
  };

  // Filter jobs based on search query and filters
  useEffect(() => {
    const filteredResults = jobs.filter(job => {
      if (!job) return false;

      // Search query filter
      const searchMatch = searchQuery === "" || [
        job.title,
        job.company,
        job.description
      ].some(field => field?.toLowerCase()?.includes(searchQuery.toLowerCase()));

      // Location filter
      const locationMatch = !location || 
        job.location?.toLowerCase()?.includes(location.toLowerCase());

      // Category filter
      const categoryMatch = filters.category === "All" || 
        job.category?.toLowerCase() === filters.category.toLowerCase();

      // Job type filter
      const typeMatch = filters.jobType === "All" || 
        job.type?.toLowerCase() === filters.jobType.toLowerCase();

      // Experience level filter
      const experienceMatch = filters.experienceLevel === "All" || 
        job.experienceLevel?.toLowerCase() === filters.experienceLevel.toLowerCase();

      // Salary range filter
      const salaryMatch = filters.salaryRange === "All" || 
        (job.salary && matchSalaryRange(job.salary, filters.salaryRange));

      const result = searchMatch && locationMatch && categoryMatch && typeMatch && experienceMatch && salaryMatch;
      
      // Debug log for jobs that don't match filters
      if (!result && job) {
        console.log('Job filtered out:', {
          title: job.title,
          category: job.category,
          type: job.type,
          experienceLevel: job.experienceLevel,
          filters: filters,
          matches: {
            category: categoryMatch,
            type: typeMatch,
            experience: experienceMatch,
            salary: salaryMatch
          }
        });
      }
      
      return result;
    });

    console.log(`Filtered jobs: ${filteredResults.length} of ${jobs.length}`);
    setFilteredJobs(filteredResults);
  }, [searchQuery, location, filters, jobs]);

  // Filter options
  const filterOptions = {
    categories: ["All", "Technology", "Design", "Marketing", "Product", "Sales", "Other"],
    jobTypes: ["All", "Full-time", "Part-time", "Contract", "Remote", "Internship"],
    experienceLevels: ["All", "Entry Level", "Mid Level", "Senior Level", "Lead", "Manager"],
    salaryRanges: ["All", "0-50k", "50k-100k", "100k-150k", "150k+"],
  };

  // Initialize filtered jobs in the filters useEffect instead
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, location, filters]);



  const handleFilterChange = (filterType, value) => {
    console.log(`Changing ${filterType} to:`, value); // Debug log
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

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

            {/* Search and Location Inputs */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs, companies, or keywords"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
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
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {filterOptions.categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  value={filters.jobType}
                  onChange={(e) => handleFilterChange("jobType", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {filterOptions.jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={filters.experienceLevel}
                  onChange={(e) => handleFilterChange("experienceLevel", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {filterOptions.experienceLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range
                </label>
                <select
                  value={filters.salaryRange}
                  onChange={(e) => handleFilterChange("salaryRange", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {filterOptions.salaryRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              {/* Filter options are in the sidebar */}
            </div>

            {/* Results Count and Pagination Info */}
            <div className="mt-4 mb-6">
              <p className="text-gray-600">
                Showing {Math.min(currentPage * jobsPerPage, filteredJobs.length)} of {filteredJobs.length} jobs
              </p>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">Loading jobs...</span>
                </div>
              ) : error ? (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 mb-4">
                  <p>{error}</p>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No jobs found matching your criteria.</p>
                </div>
              ) : (
                filteredJobs
                  .slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)
                  .map((job, index) => (
                <motion.div
                  key={job.id}
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
                          <div className="flex items-center space-x-2">
                            {job.featured && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Featured
                              </span>
                            )}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleToggleFavorite(job);
                              }}
                              className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${
                                isFavorite(job) ? 'text-red-500' : 'text-gray-400'
                              }`}
                            >
                              <Star className={`w-5 h-5 ${isFavorite(job) ? 'fill-current' : ''}`} />
                            </button>
                          </div>
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
                        </div>
                        <p className="text-gray-700 mb-4 line-clamp-2">
                          {job.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-semibold flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </span>
                          <Link
                            to={`/jobs/${job.id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            View Job
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )))}
            </div>

            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 border border-gray-300 rounded-lg ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    Previous
                  </button>
                  {Array.from(
                    { length: Math.ceil(filteredJobs.length / jobsPerPage) },
                    (_, i) => (
                      <button
                        key={`page-${i + 1}`}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-2 rounded-lg ${
                          currentPage === i + 1
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {i + 1}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => setCurrentPage(prev => 
                      Math.min(Math.ceil(filteredJobs.length / jobsPerPage), prev + 1)
                    )}
                    disabled={currentPage === Math.ceil(filteredJobs.length / jobsPerPage)}
                    className={`px-3 py-2 border border-gray-300 rounded-lg ${
                      currentPage === Math.ceil(filteredJobs.length / jobsPerPage)
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-400'
                    }`}
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
