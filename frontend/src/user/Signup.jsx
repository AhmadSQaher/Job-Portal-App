import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: 'user',
    error: '',
    success: false
  })

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false })
        } else {
          setValues({
            username: '',
            name: '',
            email: '',
            password: '',
            role: 'user',
            error: '',
            success: true
          })
          navigate('/signin')
        }
      })
      .catch(() =>
        setValues({ ...values, error: 'Signup failed', success: false })
      )
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={values.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={values.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={values.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={values.password}
          onChange={handleChange}
          required
        />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Select account type:
        </Typography>
        <RadioGroup
          row
          name="role"
          value={values.role}
          onChange={handleChange}
        >
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel value="employer" control={<Radio />} label="Employer" />
          <FormControlLabel value="dev" control={<Radio />} label="Developer/Admin" />
        </RadioGroup>

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
      {values.error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {values.error}
        </Typography>
      )}
    </Box>
  )
}

export default Signup
