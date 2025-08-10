import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Building2, Users, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useJobContext } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";

export default function Companies() {
  const navigate = useNavigate();
  const { jobs, loading } = useJobContext();
  const { user } = useAuth();
  
  if (loading || !jobs || !Array.isArray(jobs)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading companies...</span>
      </div>
    );
  }

  const companies = useMemo(() => {
    if (!Array.isArray(jobs)) return [];
    
    const uniqueCompanies = new Map();
    jobs.forEach(job => {
      const companyName = job.company || 'Unknown Company';
      if (!uniqueCompanies.has(companyName)) {
        uniqueCompanies.set(companyName, {
          id: job.id || job._id,
          name: companyName,
          logo: job.logo || "🏢",
          industry: job.category || 'Uncategorized',
          location: job.location || 'Location not specified',
          employees: "50+", // Default value since we don't have this data
          rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1), // Random rating between 3.5-5
          openPositions: 1
        });
      } else {
        const company = uniqueCompanies.get(companyName);
        company.openPositions++;
      }
    });

    return Array.from(uniqueCompanies.values());
  }, [jobs]);

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
            Discover amazing companies and their opportunities.
          </p>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {companies.length} companies with active job listings
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">No companies found with active job listings.</p>
            </div>
          ) : (
            companies.map((company, index) => (
            <motion.div
              key={company.id}
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
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{company.employees} employees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">
                    {company.rating}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 font-medium">
                  {company.openPositions} open positions
                </span>
                {(!user || user.role !== 'employer') && (
                  <button 
                    onClick={() => navigate('/jobs', { state: { companySearch: company.name } })}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Jobs
                  </button>
                )}
              </div>
            </motion.div>
          )))}
        </div>
      </div>
    </div>
  );
}