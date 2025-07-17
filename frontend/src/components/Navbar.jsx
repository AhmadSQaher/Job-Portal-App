import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: '#fff', textDecoration: 'none' }}>
          LINX
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/jobs" color="inherit">
            Jobs
          </Button>
          {!user && (
            <>
              <Button component={Link} to="/signup" color="inherit">
                Sign Up
              </Button>
              <Button component={Link} to="/signin" color="inherit">
                Sign In
              </Button>
            </>
          )}
          {user && (
            <>
              {user.role === 'user' && (
                <Button component={Link} to="/user/dashboard" color="inherit">
                  Dashboard
                </Button>
              )}
              {user.role === 'employer' && (
                <Button component={Link} to="/employer/dashboard" color="inherit">
                  Employer Panel
                </Button>
              )}
              {(user.role === 'dev' || user.role === 'admin') && (
                <Button component={Link} to="/dev/dashboard" color="inherit">
                  Admin Panel
                </Button>
              )}
              <Button onClick={handleLogout} color="secondary" variant="outlined">
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}