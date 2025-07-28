import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Award, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "Connecting talented professionals with amazing opportunities worldwide.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a global community of job seekers and employers.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering exceptional service and innovative solutions.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "Passionate about helping people achieve their career goals.",
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About LINX</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize the way people find jobs and
            companies find talent.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            LINX was founded with a simple vision: to make job searching and
            hiring more human, more efficient, and more successful. We believe
            that every person deserves to find work they love, and every company
            deserves to find the perfect team members.
          </p>
          <p className="text-gray-600">
            Today, we're proud to serve thousands of job seekers and employers
            worldwide, helping them connect, grow, and succeed together.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
