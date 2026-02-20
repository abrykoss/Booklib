import { Request, Response, NextFunction } from 'express';

import { loanService } from '../services/loanService';

export const loanController = {
    getAll: (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(loanService.getAll());
        } catch (err) {
            next(err);
        }

    },

    create: (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(201).json(loanService.create(req.body));
        } catch (err) {
            next(err);
        }
    },



    returnBook: (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(loanService.returnBook(req.params.id));
        } catch (err) {
            next(err);
        }
    },

};