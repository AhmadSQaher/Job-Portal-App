import React, { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  TrendingUp,
  Users,
  Building2,
  Code,
  AtSign as Design,
  Martini as Marketing,
  Ambulance as Finance,
  Heart as Healthcare,
  GraduationCap as Education,
  ChevronRight,
  Star,
  ArrowRight,
} from "lucide-react";

// Ultra-lazy load heavy components to improve LCP
const SplineEmbed = lazy(() => 
  import("../components/SplineEmbed").then(module => ({
    default: module.default
  }))
);

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [animationReady, setAnimationReady] = useState(false);

  // Delay heavy 3D animations to improve LCP
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationReady(true);
    }, 3000); // Load 3D after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    // Simple search handler - could be enhanced to navigate to jobs page with search params
    if (searchQuery.trim() || location.trim()) {
      console.log('Searching for:', { query: searchQuery, location });
      // In a real app, this would navigate to /jobs?search=query&location=location
    }
  };

  const jobCategories = [
    { icon: Code, name: "Technology", count: "2,847", color: "bg-blue-500" },
    { icon: Design, name: "Design", count: "1,234", color: "bg-purple-500" },
    { icon: Marketing, name: "Marketing", count: "987", color: "bg-green-500" },
    { icon: Finance, name: "Finance", count: "756", color: "bg-yellow-500" },
    { icon: Healthcare, name: "Healthcare", count: "654", color: "bg-red-500" },
    {
      icon: Education,
      name: "Education",
      count: "432",
      color: "bg-indigo-500",
    },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      logo: "🏢",
      featured: true,
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "New York, NY",
      salary: "$100k - $130k",
      type: "Full-time",
      logo: "🚀",
      featured: true,
    },
    {
      id: 3,
      title: "UX Designer",
      company: "DesignStudio",
      location: "Austin, TX",
      salary: "$80k - $110k",
      type: "Full-time",
      logo: "🎨",
      featured: true,
    },
  ];

  const stats = [
    { label: "Active Jobs", value: "12,847", icon: TrendingUp },
    { label: "Companies", value: "2,156", icon: Building2 },
    { label: "Job Seekers", value: "45,231", icon: Users },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-left max-w-2xl">
              {/* Logo - Optimized for LCP */}
              <div className="mb-8">
                <img 
                  src="/LINXLogo.webp" 
                  alt="LINX Logo" 
                  width="64"
                  height="64"
                  className="logo-optimized w-16 h-16 object-contain"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  onError={(e) => {
                    // Try multiple fallback paths
                    const currentSrc = e.target.src;
                    if (currentSrc.includes('/LINXLogo.webp')) {
                      e.target.src = '/assets/LINXLogo.webp';
                    } else if (currentSrc.includes('/assets/LINXLogo.webp')) {
                      // Hide image and show fallback
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center';
                      fallback.innerHTML = '<span class="text-white font-bold text-xl">L</span>';
                      e.target.parentNode.appendChild(fallback);
                    }
                  }}
                />
              </div>

              {/* CRITICAL LCP ELEMENT - Static render with inline styles for immediate visibility */}
              <h1
                className="lcp-critical text-4xl md:text-6xl font-bold mb-6 leading-tight"
                style={{ 
                  opacity: 1,
                  transform: 'translateZ(0)',
                  willChange: 'auto',
                  animation: 'none',
                  fontDisplay: 'swap'
                }}
              >
                Find Your Dream Job
                <span className="block text-blue-200">Today</span>
              </h1>

              {/* Supporting text - Static for immediate visibility */}
              <p className="text-lg text-blue-100 mb-8">
                Connecting talent with opportunity
              </p>

              <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
                Discover thousands of job opportunities with all the information
                you need. Its your future.
              </p>

              {/* Search Bar - Use conditional rendering to avoid motion library initially */}
              <div className="bg-white rounded-xl p-2 shadow-lg mb-8">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Job title, keywords, or company"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                  <button 
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Search Jobs
                  </button>
                </div>
              </div>

              {/* Popular Searches - Static to avoid animation blocking */}
              <div className="flex flex-wrap gap-2">
                <span className="text-blue-200 text-sm">Popular:</span>
                {[
                  "Software Engineer",
                  "Product Manager",
                  "UX Designer",
                  "Data Scientist",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="text-blue-100 hover:text-white text-sm bg-blue-500/20 hover:bg-blue-500/30 px-3 py-1 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - 3D Robot - Ultra-delayed for LCP optimization */}
            <div className="h-96 lg:h-[500px] relative">
              {!animationReady ? (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-lg">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🤖</div>
                    <div className="text-lg">Interactive 3D Loading...</div>
                  </div>
                </div>
              ) : (
                <Suspense 
                  fallback={
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-lg">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🤖</div>
                        <div className="text-lg">Loading 3D Experience...</div>
                      </div>
                    </div>
                  }
                >
                  <SplineEmbed 
                    scene="https://prod.spline.design/VdhvnwERo8cr6HiK/scene.splinecode"
                    className="w-full h-full"
                  />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Static to avoid animation blocking */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center"
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Job Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect job in your field of expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.count} jobs available
                  </p>
                  <Link
                    to={`/jobs?category=${category.name.toLowerCase()}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Browse Jobs
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs - Static to avoid blocking */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Jobs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hand-picked opportunities from top companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {job.featured && (
                  <div className="flex items-center mb-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">Featured</span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl">{job.logo}</div>
                  <span className="text-sm text-gray-500">{job.type}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {job.title}
                </h3>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <p className="text-gray-500 text-sm mb-4">{job.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-semibold">
                    {job.salary}
                  </span>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Job
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/jobs"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View All Jobs
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
