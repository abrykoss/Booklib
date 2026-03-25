import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';

export const userController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {

        try {
            res.json(await userService.getAll());
        } catch (err) {
            next(err);
        }

    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userService.getById(req.params.id);
            user ? res.json(user) : res.status(404).json({ error: 'User not found' });
        } catch (err) {
            next(err);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {

       try {
            res.status(201).json(await userService.create(req.body));
        } catch (err) {
            next(err);
        }
    },

    getMe: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await userService.getMe(req.user!.userId));
        } catch (err) {
            next(err);
        }
    },
};