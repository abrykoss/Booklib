import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface JwtPayload {
    userId: string;
    email: string;
    role: 'USER' | 'ADMIN';

}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }

    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: token is missing' });

    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = payload;
        next();

    } catch {
        return res.status(401).json({ error: 'Unauthorized: invalid or expired token' });
    }
};