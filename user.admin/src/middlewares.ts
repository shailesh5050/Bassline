import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();

interface IUser {
    _id: string;
    name: string;
    password: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    playlists: string[];
    likedSongs: string[];
}

interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.token as string;
        if (!token) {
            console.log('No token provided in request headers');
            res.status(401).json({
                message: 'Unauthorized - No token provided',
            });
            return;
        }

        let baseUrl = process.env.USER_SERVICES_URL;
        if (!baseUrl) {
            throw new Error('USER_SERVICES_URL environment variable is not set');
        }

        // Clean up the URL - remove any environment variable declaration text
        baseUrl = baseUrl.replace(/.*=\s*/, '').trim();

        // Validate URL format
        try {
            new URL(baseUrl);
        } catch (urlError) {
            throw new Error(`Invalid USER_SERVICES_URL: ${baseUrl}`);
        }

        console.log(`Attempting to authenticate with URL: ${baseUrl}/api/v1/user/me`);
        const response = await axios.get(`${baseUrl}/api/v1/user/me`, {
            headers: {
                token: token,
            },
        });

        console.log('User service response:', response.status, response.data);

        if (!response.data) {
            throw new Error('No data received from user service');
        }

        // Log the user data to debug role issues
        console.log('User data received:', {
            user: response.data,
            role: response.data.user.role,
            userType: typeof response.data.role
        });

        req.user = response.data.user;
        next();
    } catch (error) {
        console.error('Detailed authentication error:', {
            error: error instanceof Error ? {
                message: error.message,
                name: error.name,
                stack: error.stack
            } : error,
            token: req.headers.token ? 'Token exists' : 'No token',
            serviceUrl: process.env.USER_SERVICES_URL
        });

        if (axios.isAxiosError(error)) {
            res.status(error.response?.status || 403).json({
                message: 'Authentication failed',
                error: error.response?.data || error.message
            });
        } else {
            res.status(403).json({
                message: 'Authentication failed',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}

//setup multer

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).any();
export default upload;