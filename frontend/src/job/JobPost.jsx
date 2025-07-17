import React, { useState } from 'react'
import { TextField, Button, Typography, MenuItem, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import auth from '../auth/auth-helper.jsx'

const JobPost = () => {
  const navigate = useNavigate()
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    category: 'Other',
  })

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const jwt = auth.isAuthenticated()
    if (!jwt || !jwt.token) {
      alert('You must be signed in to post a job.')
      navigate('/signin')
      return
    }

    fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt.token,
      },
      body: JSON.stringify(job),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || 'Job posted successfully!')
        navigate('/employer/dashboard')
      })
      .catch((err) => {
        console.error(err)
        alert('Failed to post job.')
      })
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Post a Job
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={job.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={job.description}
          onChange={handleChange}
          required
        />
        <TextField
          label="Location"
          name="location"
          fullWidth
          margin="normal"
          value={job.location}
          onChange={handleChange}
          required
        />
        <TextField
          select
          label="Category"
          name="category"
          fullWidth
          margin="normal"
          value={job.category}
          onChange={handleChange}
        >
          {['Engineering', 'Design', 'Marketing', 'Sales', 'Other'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default JobPost