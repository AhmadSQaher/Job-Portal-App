// Home.jsx
import React from 'react'
import { Typography, Button, Container, Box } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to LINX 
      </Typography>
      <Typography variant="h6" paragraph>
        Connect. Hire. Grow. The portal that links talent to opportunity.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button component={Link} to="/signup" variant="contained" sx={{ mr: 2 }}>
          Sign Up
        </Button>
        <Button component={Link} to="/signin" variant="outlined" sx={{ mr: 2 }}>
          Sign In
        </Button>
        <Button component={Link} to="/jobs" variant="text">
          View Jobs
        </Button>
      </Box>
    </Container>
  )
}