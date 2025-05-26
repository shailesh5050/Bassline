import { Request, Response } from 'express';

export function registerUser(req: Request, res: Response) {
    console.log('Register endpoint hit');
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);
    
    try {
        res.json({
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({
            message: 'Error registering user'
        });
    }
}