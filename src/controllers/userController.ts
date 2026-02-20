import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';

export const userController = {
    getAll: (req: Request, res: Response, next: NextFunction) => {

        try {
            res.json(userService.getAll());
        } catch (err) {
            next(err);
        }

    },

    getById: (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = userService.getById(req.params.id);
            user ? res.json(user) : res.status(404).json({ error: 'User not found' });
        } catch (err) {
            next(err);
        }
    },

    create: (req: Request, res: Response, next: NextFunction) => {

       try {
            res.status(201).json(userService.create(req.body));
        } catch (err) {
            next(err);
        }
    },
};