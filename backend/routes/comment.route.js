import express from 'express'
import { createComment, getComments, likeComment } from '../controllers/comment.controller.js'
import { verifyToken } from '../utils/verifyUser.js'
const router = express.Router()

router.post('/createComment', verifyToken, createComment)
router.get('/getComments/:postId', verifyToken, getComments)
router.put('/likecomment/:commentId', verifyToken, likeComment)

export default router