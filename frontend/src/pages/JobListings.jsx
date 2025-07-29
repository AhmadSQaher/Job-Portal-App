import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Filter,
  Star,
  Building2,
  Clock,
  DollarSign,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const JobListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3); // Number of jobs to show per page

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      category: "Technology",
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
    {
      id: 4,
      title: "Data Scientist",
      company: "DataCorp",
      location: "Seattle, WA",
      salary: "$130k - $160k",
      type: "Full-time",
      category: "Technology",
      logo: "📊",
      featured: false,
      posted: "5 days ago",
      description: "Help us build the future of data-driven decision making...",
    },
    {
      id: 5,
      title: "Marketing Manager",
      company: "GrowthCo",
      location: "Los Angeles, CA",
      salary: "$90k - $120k",
      type: "Full-time",
      category: "Marketing",
      logo: "📈",
      featured: false,
      posted: "1 week ago",
      description: "Drive our marketing strategy and growth initiatives...",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Remote",
      salary: "$110k - $140k",
      type: "Full-time",
      category: "Technology",
      logo: "☁️",
      featured: true,
      posted: "2 days ago",
      description: "Build and maintain our cloud infrastructure...",
    },
    {
      id: 7,
      title: "Backend Developer",
      company: "CodeCorp",
      location: "Boston, MA",
      salary: "$100k - $130k",
      type: "Full-time",
      category: "Technology",
      logo: "💻",
      featured: false,
      posted: "4 days ago",
      description: "Build scalable backend systems and APIs...",
    },
    {
      id: 8,
      title: "Sales Representative",
      company: "SalesPro",
      location: "Chicago, IL",
      salary: "$70k - $90k",
      type: "Full-time",
      category: "Sales",
      logo: "📞",
      featured: false,
      posted: "6 days ago",
      description: "Drive sales growth and build client relationships...",
    },
  ];

  // Filter jobs based on search, location, and category
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      location === "" ||
      job.location.toLowerCase().includes(location.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      job.category.toLowerCase() === selectedCategory;

    return matchesSearch && matchesLocation && matchesCategory;
  });

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, location, selectedCategory]);

  // Pagination handlers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of job listings
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show pages around current page
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Adjust start page if we're near the end
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const categories = [
    "all",
    "Technology",
    "Product",
    "Design",
    "Marketing",
    "Sales",
  ];

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
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Job Category
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {category === "all" ? "All Categories" : category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Experience Level
                </h4>
                <div className="space-y-2">
                  {["Entry Level", "Mid Level", "Senior", "Executive"].map(
                    (level) => (
                      <label
                        key={level}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mr-2 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{level}</span>
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
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {indexOfFirstJob + 1}-
                {Math.min(indexOfLastJob, filteredJobs.length)} of{" "}
                {filteredJobs.length} jobs
                {filteredJobs.length !== jobs.length &&
                  ` (filtered from ${jobs.length} total)`}
              </p>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {currentJobs.map((job, index) => (
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
              ))}
            </div>

            {/* Enhanced Pagination */}
            {filteredJobs.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 border border-gray-300 rounded-lg flex items-center space-x-1 transition-colors ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed bg-gray-50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`px-3 py-2 border rounded-lg transition-colors ${
                        currentPage === pageNumber
                          ? "bg-blue-600 text-white border-blue-600"
                          : "text-gray-700 hover:text-gray-900 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 border border-gray-300 rounded-lg flex items-center space-x-1 transition-colors ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed bg-gray-50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              </div>
            )}

            {/* No Results Message */}
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;
