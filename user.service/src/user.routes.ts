import express from 'express';
const router = express.Router();
import { registerUser } from './user.controller.js';
router.post('/register', registerUser); // Using POST method for registration
export default router;