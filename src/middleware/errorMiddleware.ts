import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.errors.map(e => ({ path: e.path.join('.'), message: e.message })),
        });
    }



    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
//todo loan



    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
};