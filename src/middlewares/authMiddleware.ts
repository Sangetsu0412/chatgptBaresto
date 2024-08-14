import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: string | object;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).send('Access Denied'); // No need to return
        return; // Explicitly return to end the middleware execution
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = verified;
        next(); // Pass control to the next middleware
    } catch (err) {
        res.status(400).send('Invalid Token'); // No need to return
        return; // Explicitly return to end the middleware execution
    }
};

// Admin middleware
export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || (req.user as any).role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

export default authMiddleware;
