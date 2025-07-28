import express from 'express'
import employerCtrl from '../controllers/employer.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import checkRole from '../middleware/roleCheck.js'

const router = express.Router()

// Create new employer account
router.route('/api/employers')
  .post(employerCtrl.create)
  .get(authCtrl.requireSignin, checkRole(['admin']), employerCtrl.list)

// Read/update/delete employer profile
router.route('/api/employers/:employerId')
  .get(authCtrl.requireSignin, employerCtrl.read)
  .put(authCtrl.requireSignin, employerCtrl.update)
  .delete(authCtrl.requireSignin, employerCtrl.remove)

// Bind employerId param middleware
router.param('employerId', employerCtrl.employerByID)

export default router