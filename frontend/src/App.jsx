import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Critical components - load immediately for LCP optimization
import Layout from "./components/Layout.jsx";
import AuthProvider from "./context/AuthContext";
import { JobContextProvider } from "./context/JobContext";

// Lazy load ALL pages for optimal bundle splitting
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const EmployerProfile = lazy(() => import("./pages/EmployerProfile.jsx"));
const PostJob = lazy(() => import("./pages/PostJob.jsx"));
const JobDetails = lazy(() => import("./pages/JobDetails.jsx"));
const JobListings = lazy(() => import("./pages/JobListings.jsx"));
const Companies = lazy(() => import("./pages/Companies.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Favorites = lazy(() => import("./pages/Favorites.jsx"));
const FreeAgents = lazy(() => import("./pages/FreeAgents.jsx"));

// Heavy components - separate lazy loading
const SplineTestPage = lazy(() => import("./pages/SplineTestPage.jsx"));

// Lazy load components for further bundle optimization
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const CSS_Test = lazy(() => import("./components/CSS_Test.jsx"));
const DashboardTest = lazy(() => import("./components/DashboardTest.jsx"));
const LoginTest = lazy(() => import("./components/LoginTest.jsx"));
const SimpleCSS_Test = lazy(() => import("./components/SimpleCSS_Test.jsx"));
const PostJobTest = lazy(() => import("./components/PostJobTest.jsx"));
const PostJobVerification = lazy(() => import("./components/PostJobVerification.jsx"));

// Legacy Views - lazy loaded and grouped
const Home = lazy(() => import("./views/Home.jsx"));
const Signup = lazy(() => import("./user/Signup.jsx"));
const Signin = lazy(() => import("./views/auth/Signin.jsx"));
const JobList = lazy(() => import("./job/JobList.jsx"));
const JobPost = lazy(() => import("./job/JobPost.jsx"));
const EmployerDashboard = lazy(() => import("./employer/EmployerDashboard.jsx"));
const UserDashboard = lazy(() => import("./views/dashboards/UserDashboard.jsx"));
const DevDashboard = lazy(() => import("./views/dashboards/DevDashboard.jsx"));

// Optimized loading component with better performance
const LoadingSpinner = React.memo(() => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <span className="text-sm text-gray-600 font-medium">Loading...</span>
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

export default function App() {
  return (
    <AuthProvider>
      <JobContextProvider>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
              {/* New Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/companies" element={<Companies />} />
              <Route
                path="/free-agents"
                element={
                  <PrivateRoute role="employer">
                    <FreeAgents />
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/css-test" element={<CSS_Test />} />
              <Route path="/simple-css-test" element={<SimpleCSS_Test />} />
              <Route path="/dashboard-test" element={<DashboardTest />} />
              <Route path="/login-test" element={<LoginTest />} />
              <Route path="/post-job-test" element={<PostJobTest />} />
              <Route path="/spline-test" element={<SplineTestPage />} />
              <Route
                path="/post-job-verification"
                element={<PostJobVerification />}
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute role={["user", "employer"]}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    {({ user }) => {
                      return user.role === 'employer' ? <EmployerProfile /> : <Profile />;
                    }}
                  </PrivateRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <PrivateRoute role={["user", "employer"]}>
                    <Favorites />
                  </PrivateRoute>
                }
              />
              <Route
                path="/post-job"
                element={
                  <PrivateRoute role="employer">
                    <PostJob />
                  </PrivateRoute>
                }
              />

              {/* Legacy Routes (keeping for backward compatibility) */}
              <Route path="/legacy" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/legacy/jobs" element={<JobList />} />
              <Route
                path="/user/dashboard"
                element={
                  <PrivateRoute role="user">
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employer/dashboard"
                element={
                  <PrivateRoute role="employer">
                    <EmployerDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employer/post"
                element={
                  <PrivateRoute role="employer">
                    <JobPost />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dev/dashboard"
                element={
                  <PrivateRoute role={["dev", "admin"]}>
                    <DevDashboard />
                  </PrivateRoute>
                }
              />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </JobContextProvider>
    </AuthProvider>
  );
}
