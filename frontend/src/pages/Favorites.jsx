import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Building2,
  Clock,
  DollarSign,
  Share2,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Favorites = () => {
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch favorite jobs based on favoriteIds
  useEffect(() => {
    const fetchFavoriteJobs = async () => {
      try {
        // Get favoriteIds from localStorage
        const savedIds = localStorage.getItem('favoriteIds');
        const favoriteIds = savedIds ? JSON.parse(savedIds) : [];
        
        if (favoriteIds.length === 0) {
          setFavoriteJobs([]);
          return;
        }

        // Fetch jobs from the API
        const response = await fetch('http://localhost:3000/api/jobs');
        if (!response.ok) throw new Error('Failed to fetch jobs');
        
        const allJobs = await response.json();
        
        // Filter jobs that are in favoriteIds
        const favorites = allJobs.filter(job => {
          const jobId = String(job._id || job.id);
          return favoriteIds.includes(jobId);
        });
        
        setFavoriteJobs(favorites);
      } catch (error) {
        console.error('Error fetching favorite jobs:', error);
        toast.error('Failed to load favorite jobs');
      }
    };

    fetchFavoriteJobs();
  }, []); // Add any dependencies if needed

  const filteredFavorites = favoriteJobs.filter(job =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveFavorite = (job) => {
    const jobId = String(job._id || job.id);
    const savedIds = localStorage.getItem('favoriteIds');
    const favoriteIds = savedIds ? JSON.parse(savedIds) : [];
    
    const newFavoriteIds = favoriteIds.filter(id => id !== jobId);
    localStorage.setItem('favoriteIds', JSON.stringify(newFavoriteIds));
    
    setFavoriteJobs(prevJobs => 
      prevJobs.filter(j => String(j._id || j.id) !== jobId)
    );
    
    toast.success('Removed from favorites');
  };

  const handleShareJob = (job) => {
    const shareData = {
      title: job.title,
      text: `Check out this job: ${job.title} at ${job.company}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => toast.success('Job shared successfully'))
        .catch(() => {
          navigator.clipboard.writeText(`${job.title} at ${job.company} - ${window.location.href}`);
          toast.success('Job link copied to clipboard');
        });
    } else {
      navigator.clipboard.writeText(`${job.title} at ${job.company} - ${window.location.href}`);
      toast.success('Job link copied to clipboard');
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
    <div className="container mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Favorite Jobs</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search in favorites..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-6">
        {filteredFavorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No favorite jobs found</p>
            {searchTerm ? (
              <p className="text-gray-400 mt-2">Try adjusting your search term</p>
            ) : (
              <Link to="/jobs" className="text-blue-500 hover:text-blue-600 mt-4 inline-flex items-center">
                Browse jobs <ArrowRight className="ml-2" size={16} />
              </Link>
            )}
          </div>
        ) : (
          filteredFavorites.map((job) => (
            <motion.div
              key={job._id || job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]"
            >
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Building2 size={18} className="mr-2" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={18} className="mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="mr-2" />
                      {job.type}
                    </div>
                    <div className="flex items-center">
                      <DollarSign size={18} className="mr-2" />
                      {job.salary}
                    </div>
                  </div>
                  {job.skills && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="text-blue-500 hover:text-blue-600 inline-flex items-center"
                    >
                      View Details <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRemoveFavorite(job.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    onClick={() => handleShareJob(job)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    title="Share job"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
