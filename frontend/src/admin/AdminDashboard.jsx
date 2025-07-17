import React, { useEffect, useState } from 'react'
import { Typography, Box, Divider, List, ListItem, ListItemText } from '@mui/material'

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [employers, setEmployers] = useState([])
  const [jobs, setJobs] = useState([])

  const token = JSON.parse(localStorage.getItem('jwt')).token

  useEffect(() => {
    fetch('/api/admin/users', {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(res => res.json())
      .then(setUsers)

    fetch('/api/admin/employers', {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(res => res.json())
      .then(setEmployers)

    fetch('/api/admin/jobs', {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(res => res.json())
      .then(setJobs)
  }, [token])

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Users</Typography>
      <List dense>
        {users.map(user => (
          <ListItem key={user._id}>
            <ListItemText
              primary={`${user.name} (${user.role})`}
              secondary={user.email}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Employers</Typography>
      <List dense>
        {employers.map(emp => (
          <ListItem key={emp._id}>
            <ListItemText
              primary={`${emp.name} - ${emp.company}`}
              secondary={emp.email}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Jobs</Typography>
      <List dense>
        {jobs.map(job => (
          <ListItem key={job._id}>
            <ListItemText
              primary={job.title}
              secondary={`${job.category} • ${job.location}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default AdminDashboard