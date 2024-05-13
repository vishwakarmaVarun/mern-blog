import express from 'express'
import { createComment, deleteComment, editComment, getComments, likeComment } from '../controllers/comment.controller.js'
import { verifyToken } from '../utils/verifyUser.js'
const router = express.Router()

router.post('/createComment', verifyToken, createComment)
router.get('/getComments/:postId', verifyToken, getComments)
router.put('/likecomment/:commentId', verifyToken, likeComment)
router.put('/editcomment/:commentId', verifyToken, editComment)
router.delete('/deletecomment/:commentId', verifyToken, deleteComment)

export default router