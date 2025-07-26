import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// New Pages
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import PostJob from "./pages/PostJob.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import JobListings from "./pages/JobListings.jsx";
import ViewJobs from "./pages/ViewJobs.jsx";
import Companies from "./pages/Companies.jsx";
import About from "./pages/About.jsx";

// Legacy Views (keeping for backward compatibility)
import Home from "./views/Home.jsx";
import Signup from "./user/Signup.jsx";
import Signin from "./views/auth/Signin.jsx";
import JobList from "./job/JobList.jsx";
import JobPost from "./job/JobPost.jsx";
import EmployerDashboard from "./employer/EmployerDashboard.jsx";
import UserDashboard from "./views/dashboards/UserDashboard.jsx";
import DevDashboard from "./views/dashboards/DevDashboard.jsx";

// Components
import Layout from "./components/Layout.jsx";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./context/AuthContext";
import CSS_Test from "./components/CSS_Test.jsx";
import DashboardTest from "./components/DashboardTest.jsx";
import LoginTest from "./components/LoginTest.jsx";
import SimpleCSS_Test from "./components/SimpleCSS_Test.jsx";
import PostJobTest from "./components/PostJobTest.jsx";
import PostJobVerification from "./components/PostJobVerification.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* New Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/view-jobs" element={<ViewJobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
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
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
