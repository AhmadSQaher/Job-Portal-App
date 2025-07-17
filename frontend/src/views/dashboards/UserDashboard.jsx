import React from 'react'
import { Typography, Container } from '@mui/material'

export default function UserDashboard() {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard 🧑‍💼
      </Typography>
      <Typography variant="body1">
        Here, job seekers can edit their profile, post resumes, and explore jobs.
      </Typography>
    </Container>
  )
}