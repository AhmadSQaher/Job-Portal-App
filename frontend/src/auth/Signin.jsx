import React, { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import auth from './auth-helper.jsx'

const Signin = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('🚀 Sending login request:', { username, password })

    if (!username || !password) {
      setError('Username and password are required')
      return
    }

    try {
      const res = await fetch('/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()
      console.log('📬 Response from server:', data)

      if (data.error) {
        setError(data.error)
      } else {
        auth.authenticate(data, () => {
          const role = data.user.role
          if (role === 'user') {
            navigate('/user/dashboard')
          } else if (role === 'employer') {
            navigate('/employer/dashboard')
          } else if (role === 'dev' || role === 'admin') {
            navigate('/dev/dashboard')
          } else {
            navigate('/')
          }
        })
      }
    } catch (err) {
      console.error('❌ Signin failed:', err)
      setError('Signin failed. Please try again.')
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Sign In to LINX
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => {
            console.log('✏️ Username input:', e.target.value)
            setUsername(e.target.value)
          }}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => {
            console.log('🔐 Password input:', e.target.value)
            setPassword(e.target.value)
          }}
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  )
}

export default Signin