import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';

export const authController = {
    register: async (req: Request, res: Response, next: NextFunction) => {

        try {
            res.status(201).json(await authService.register(req.body));
        } catch (err) {
            next(err);
        }
    },

    login: async (req: Request, res: Response, next: NextFunction) => {
        try {

            res.json(await authService.login(req.body));
        } catch (err) {
            next(err);
        }
    },

};