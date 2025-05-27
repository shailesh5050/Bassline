import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel, { IUser } from "./model.js";    

export interface AuthenticatedRequest extends Request {
    user?: IUser | null; // Extend Request to include user property
}

export const isAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) :Promise<void> => {
    const token = req.headers.token as string | undefined; // Get token from headers
    // If token is not provided, return 401 Unauthorized
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const user = await UserModel.findById((decoded as any).userId).select('-password'); // Exclude password from the user object
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
}