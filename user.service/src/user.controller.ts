import { Request, Response } from 'express';
import TryCathch from './TryCatch.js';
import UserModel from './model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from './middlewares.js';
export const registerUser = TryCathch(async (req, res) => {
    const { name, password, email } = req.body;
    // Validate input
    if (!name || !password || !email) {
         res.status(400).json({ message: 'Name, password, and email are required' });
         return;
    }
    let user = await UserModel.findOne({ email });
    if (user) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    //hash the password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    user = await UserModel.create({
        name: name,
        password: hashPassword,
        email: email,
        role: 'user',
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: '7d',
    });
    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
    });

});

export const loginUser = TryCathch(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
        console.log("User not found");
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: '7d',
    });

    res.status(200).json({
        message: 'Login successful',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            playlist:user.playlists,
            likedSongs:user.likedSongs
        },
        token,
    });
});

export const getUserProfile = TryCathch(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?._id; // Assuming req.user is set by authentication middleware

    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const user = await UserModel.findById(userId).select('-password'); // Exclude password from the response
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    res.status(200).json({
        message: 'User profile retrieved successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            playlist: user.playlists,
            likedSongs: user.likedSongs,
        },
    });
});
