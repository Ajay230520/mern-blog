import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import {create} from '../controllers/post.controller.js'
import { getPosts,deletePost,updatepost} from '../controllers/post.controller.js';
const router = express.Router();

router.post('/create',verifyToken,create)
router.get('/getposts',getPosts);
router.delete('/deletepost/:postId/:userId',verifyToken,deletePost)
router.put('/updatepost/:postId/:userId',verifyToken,updatepost);
export default router;