import express from 'express'
import userCtrl from '../controllers/user.controller.js'

const router = express.Router()

router.post('/create', userCtrl.create)
router.get('/', userCtrl.list)
router.put('/:userId', userCtrl.update)
router.delete('/:userId', userCtrl.remove)
router.param('userId', userCtrl.userByID)

export default router
