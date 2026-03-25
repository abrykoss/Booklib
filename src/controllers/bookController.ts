import { Request, Response, NextFunction } from 'express';
import { bookService } from '../services/bookService';

export const bookController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const books = await bookService.getAll();
            res.json(books);
        } catch (err) {
            next(err);
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await bookService.getById(req.params.id);
            res.json(book);
        } catch (err) {
            next(err);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newBook = await bookService.create(req.body);
            res.status(201).json(newBook);
        } catch (err) {
            next(err);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updated = await bookService.update(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            next(err);
        }
    },

    // todo
    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await bookService.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
};