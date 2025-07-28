import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import employerCtrl from '../controllers/employer.controller.js'
import jobCtrl from '../controllers/job.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import checkRole from '../middleware/roleCheck.js'

const router = express.Router()

// Admin-only access to view everything
router.route('/api/admin/users')
  .get(authCtrl.requireSignin, checkRole(['dev']), userCtrl.list)

router.route('/api/admin/employers')
  .get(authCtrl.requireSignin, checkRole(['dev']), employerCtrl.list)

router.route('/api/admin/jobs')
  .get(authCtrl.requireSignin, checkRole(['dev']), jobCtrl.list)

export default router