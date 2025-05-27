import express from 'express';
const router = express.Router();
import { registerUser,loginUser,getUserProfile } from './user.controller.js';
import { isAuth } from './middlewares.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', isAuth, getUserProfile);

export default router;