import React from 'react'
import {
  Typography,
  Container,
  Button,
  Box
} from '@mui/material'

export default function DevDashboard() {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Developer/Admin Dashboard 🧑‍💻
      </Typography>
      <Typography variant="body1" paragraph>
        Full access granted. Manage all users, job listings, and system-level tasks.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
        <Button variant="contained" color="error">
          View All Users
        </Button>
        <Button variant="contained" color="warning">
          View All Jobs
        </Button>
        <Button variant="outlined" color="error">
          Edit or Delete Records
        </Button>
      </Box>
    </Container>
  )
}