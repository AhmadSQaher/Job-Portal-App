import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const PostJob = lazy(() => import("./pages/PostJob.jsx"));
const JobDetails = lazy(() => import("./pages/JobDetails.jsx"));
const JobListings = lazy(() => import("./pages/JobListings.jsx"));
const Favorites = lazy(() => import("./pages/Favorites.jsx"));
const Companies = lazy(() => import("./pages/Companies.jsx"));
const About = lazy(() => import("./pages/About.jsx"));

// Legacy Views (lazy loaded)
const Home = lazy(() => import("./views/Home.jsx"));
const Signup = lazy(() => import("./user/Signup.jsx"));
const Signin = lazy(() => import("./views/auth/Signin.jsx"));
const JobList = lazy(() => import("./job/JobList.jsx"));
const JobPost = lazy(() => import("./job/JobPost.jsx"));
const EmployerDashboard = lazy(() => import("./employer/EmployerDashboard.jsx"));
const UserDashboard = lazy(() => import("./views/dashboards/UserDashboard.jsx"));
const DevDashboard = lazy(() => import("./views/dashboards/DevDashboard.jsx"));

// Components (keep these non-lazy as they're critical)
import Layout from "./components/Layout.jsx";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./context/AuthContext";
import CSS_Test from "./components/CSS_Test.jsx";
import DashboardTest from "./components/DashboardTest.jsx";
import LoginTest from "./components/LoginTest.jsx";
import SimpleCSS_Test from "./components/SimpleCSS_Test.jsx";
import PostJobTest from "./components/PostJobTest.jsx";
import PostJobVerification from "./components/PostJobVerification.jsx";

// Create a loading component for better UX
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Toaster position="top-right" />
          <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* New Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/favorites" element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              } />
              <Route path="/companies" element={<Companies />} />
              <Route path="/about" element={<About />} />
              <Route path="/css-test" element={<CSS_Test />} />
              <Route path="/simple-css-test" element={<SimpleCSS_Test />} />
              <Route path="/dashboard-test" element={<DashboardTest />} />
              <Route path="/login-test" element={<LoginTest />} />
              <Route path="/post-job-test" element={<PostJobTest />} />
              <Route
                path="/post-job-verification"
                element={<PostJobVerification />}
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute role="user">
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute role="user">
                    <Profile />
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
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
