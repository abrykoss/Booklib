import { Request, Response, NextFunction } from 'express';
import { loanService } from '../services/loanService';

export const loanController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await loanService.getAll(req.user!.userId, req.user!.role));
        } catch (err) {
            next(err);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(201).json(await loanService.create({ ...req.body, userId: req.user!.userId }));
        } catch (err) {
            next(err);
        }
    },

    returnBook: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await loanService.returnBook(req.params.id, req.user!.userId, req.user!.role));
        } catch (err) {
            next(err);
        }
    },
};