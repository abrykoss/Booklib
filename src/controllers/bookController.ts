import { Request, Response, NextFunction } from 'express';
import { bookService } from '../services/bookService';


export const bookController = {
    getAll: (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(bookService.getAll());
        } catch (err) {
            next(err);
        }
    },

    getById: (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = bookService.getById(req.params.id);
            book ? res.json(book) : res.status(404).json({ error: 'Book not found' });
        } catch (err) {

            next(err);
        }

    },

    create: (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(201).json(bookService.create(req.body));
        } catch (err) {
            next(err);
        }
    },

    update: (req: Request, res: Response, next: NextFunction) => {
        try {
            const updated = bookService.update(req.params.id, req.body);
            res.json(updated);
        } catch (err) {

            next(err);
        }
    },


    //todo
    delete: (req: Request, res: Response, next: NextFunction) => {
        try {
            bookService.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
};