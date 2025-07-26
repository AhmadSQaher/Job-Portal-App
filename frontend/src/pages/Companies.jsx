import React from "react";
import { motion } from "framer-motion";
import { Building2, Users, MapPin, Star } from "lucide-react";

const Companies = () => {
  const companies = [
    {
      id: 1,
      name: "TechCorp",
      logo: "🏢",
      industry: "Technology",
      location: "San Francisco, CA",
      employees: "500-1000",
      rating: 4.5,
      openPositions: 12,
    },
    {
      id: 2,
      name: "StartupXYZ",
      logo: "🚀",
      industry: "Startup",
      location: "New York, NY",
      employees: "50-200",
      rating: 4.2,
      openPositions: 8,
    },
    {
      id: 3,
      name: "DesignStudio",
      logo: "🎨",
      industry: "Design",
      location: "Austin, TX",
      employees: "100-500",
      rating: 4.7,
      openPositions: 5,
    },
    {
      id: 4,
      name: "InnovationCo",
      logo: "💡",
      industry: "Innovation",
      location: "Seattle, WA",
      employees: "200-500",
      rating: 4.3,
      openPositions: 15,
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Companies</h1>
          <p className="text-gray-600">
            Discover amazing companies and their opportunities.
          </p>
        </motion.div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
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
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  View Jobs
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
