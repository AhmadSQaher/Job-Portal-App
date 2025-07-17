// Middleware to check user role
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.auth || !allowedRoles.includes(req.auth.role)) {
      return res.status(403).json({
        error: 'Access denied: insufficient permissions',
      })
    }
    next()
  }
}

export default checkRole