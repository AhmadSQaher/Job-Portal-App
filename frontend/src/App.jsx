import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Views
import Home from './views/Home.jsx'
import Signup from './user/Signup.jsx'
import Signin from './views/auth/Signin.jsx'
import JobList from './job/JobList.jsx'
import JobPost from './job/JobPost.jsx'
import EmployerDashboard from './employer/EmployerDashboard.jsx'
import UserDashboard from './views/dashboards/UserDashboard.jsx'
import DevDashboard from './views/dashboards/DevDashboard.jsx'
import Navbar from './components/Navbar'

// Components
import PrivateRoute from './components/PrivateRoute'
import AuthProvider from './context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/jobs" element={<JobList />} />

          {/* Protected Routes */}
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
              <PrivateRoute role={['dev', 'admin']}>
                <DevDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}