import React, { useEffect, useState } from 'react'
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress
} from '@mui/material'

const JobList = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Available Jobs
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {jobs.length === 0 ? (
            <Typography>No jobs found.</Typography>
          ) : (
            jobs.map((job) => (
              <Grid item xs={12} md={6} lg={4} key={job._id || job.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {job.title ?? 'Untitled Position'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {job.description
                        ? job.description.slice(0, 100) + '...'
                        : 'No description available'}
                    </Typography>
                    <Typography variant="body2">
                      📍 {job.location ?? 'Unknown Location'}
                    </Typography>
                    <Typography variant="body2">
                      🗂️ {job.category ?? 'Uncategorized'}
                    </Typography>
                    {job.postedBy?.company && (
                      <Typography variant="caption" color="textSecondary">
                        Posted by: {job.postedBy.company}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </div>
  )
}

export default JobList