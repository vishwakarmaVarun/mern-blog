import express from 'express'
import { home, updateUser, deleteUser, signout, getUsers } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'
const router = express.Router()

router.get('/', home)
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', signout)
router.get('/getusers', verifyToken, getUsers)

export default router