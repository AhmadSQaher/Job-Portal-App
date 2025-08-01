import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Users, MapPin, Star, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/jobs");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const jobs = await response.json();
        
        // Create a map to store company information and job counts
        const companyMap = new Map();
        
        jobs.forEach(job => {
          if (!job.company) return;
          
          if (!companyMap.has(job.company)) {
            companyMap.set(job.company, {
              name: job.company,
              logo: "🏢", // Default logo
              industry: job.category || "Various",
              location: job.location || "Multiple Locations",
              openPositions: 1
            });
          } else {
            const company = companyMap.get(job.company);
            company.openPositions++;
            // Update location if not already set
            if (!company.location && job.location) {
              company.location = job.location;
            }
            // Update industry if not already set
            if (!company.industry && job.category) {
              company.industry = job.category;
            }
          }
        });
        
        // Convert map to array and sort by number of open positions
        const companyArray = Array.from(companyMap.values())
          .sort((a, b) => b.openPositions - a.openPositions);
        
        setCompanies(companyArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch companies. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Companies</h1>
          <p className="text-gray-600">
            Explore companies and their job opportunities
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-3xl">{company.logo}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {company.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{company.industry}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{company.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">{company.industry}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-600 font-medium">
                    {company.openPositions} open positions
                  </span>
                  <button 
                    onClick={() => navigate(`/jobs?company=${encodeURIComponent(company.name)}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Jobs
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
