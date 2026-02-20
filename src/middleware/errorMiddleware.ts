import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.errors.map(e => ({ path: e.path.join('.'), message: e.message })),
        });
    }



    const notFoundMessages = ['Book not found', 'User not found', 'Loan not found or already returned'];
    if (notFoundMessages.includes(err.message)) {
        return res.status(404).json({ error: err.message });
    }
//todo loan
    const businessErrors = ['Book is not available', 'Book already on loan'];
    if (businessErrors.includes(err.message)) {
        return res.status(422).json({ error: err.message });
    }



    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
};