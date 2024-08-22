import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: any; // Adjusted the type to 'any' for simplicity
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).send('Access Denied');
        return;
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
        return;
    }
};

// Admin middleware
export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== 'admin') {
        res.status(403).json({ error: 'Access denied' });
        return; // Ensure the function exits after sending the response
    }
    next(); // Only proceed if the user has the admin role
};

export default authMiddleware;
