import React, { useEffect } from 'react'
import { Typography, Container, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function EmployerDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!user || user.role !== 'employer') {
      console.warn('User not authenticated — redirecting to signin')
      navigate('/signin')
    }
  }, [user, navigate])

  if (!user || user.role !== 'employer') return null

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Employer Dashboard 🧑‍💼
      </Typography>
      <Typography variant="body1" paragraph>
        From here you can post new jobs, view applicants, and manage your listings.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/employer/post')}>
          Post a Job
        </Button>
        <Button variant="outlined" color="primary">
          View Applicants
        </Button>
        <Button variant="text" color="secondary">
          Manage My Listings
        </Button>
      </Box>
    </Container>
  )
}