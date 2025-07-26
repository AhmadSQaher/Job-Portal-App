import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Calendar,
  Users,
  Star,
  ArrowLeft,
  Share2,
  Bookmark,
} from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();

  // Mock job data - in a real app, this would come from an API
  const job = {
    id: id,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    type: "Full-time",
    experience: "3-5 years",
    posted: "2 days ago",
    logo: "🏢",
    featured: true,
    description: `We are looking for a talented Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using modern technologies.

Key Responsibilities:
• Develop and maintain responsive web applications
• Collaborate with designers and backend developers
• Write clean, maintainable, and well-documented code
• Participate in code reviews and technical discussions
• Mentor junior developers

Requirements:
• 3+ years of experience with React, Vue, or Angular
• Strong knowledge of JavaScript, HTML, and CSS
• Experience with modern build tools and workflows
• Understanding of web performance and optimization
• Excellent communication and teamwork skills

Benefits:
• Competitive salary and equity
• Health, dental, and vision insurance
• Flexible work hours and remote work options
• Professional development opportunities
• Team events and activities`,
    requirements: [
      "3+ years of experience with React, Vue, or Angular",
      "Strong knowledge of JavaScript, HTML, and CSS",
      "Experience with modern build tools and workflows",
      "Understanding of web performance and optimization",
      "Excellent communication and teamwork skills",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible work hours and remote work options",
      "Professional development opportunities",
      "Team events and activities",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/jobs"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{job.logo}</div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {job.title}
                    </h1>
                    {job.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xl text-gray-600 mb-2">{job.company}</p>
                  <div className="flex items-center space-x-4 text-gray-500">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.posted}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Description
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Requirements
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Benefits
              </h2>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Job Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Salary</span>
                  <span className="font-semibold text-green-600">
                    {job.salary}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Job Type</span>
                  <span className="font-semibold">{job.type}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-semibold">{job.experience}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold">{job.location}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Save Job
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  About {job.company}
                </h4>
                <p className="text-gray-600 text-sm">
                  {job.company} is a leading technology company focused on
                  innovation and growth. We value creativity, collaboration, and
                  continuous learning.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
