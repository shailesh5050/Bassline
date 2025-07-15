import express from 'express';
const router = express.Router();
import { registerUser,loginUser,getUserProfile,addToPlaylist } from './user.controller.js';
import { isAuth } from './middlewares.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', isAuth, getUserProfile);
router.post('/playlist/:id', isAuth, addToPlaylist);

export default router;