const getErrorMessage = (err) => {
  let message = ''

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Email already exists'
        break
      default:
        message = 'Something went wrong'
    }
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message
      }
    }
  }

  return message
}

const handleError = (req, res) => {
  res.status(500).json({ error: 'Unexpected server error' })
}

export default {
  getErrorMessage,
  handleError,
}