"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const bookService_1 = require("../services/bookService");
exports.bookController = {
    getAll: (req, res) => res.json(bookService_1.bookService.getAll()),
    getById: (req, res) => {
        const book = bookService_1.bookService.getById(req.params.id);
        book ? res.json(book) : res.status(404).json({ error: 'Book not found' });
    },
    create: (req, res) => res.status(201).json(bookService_1.bookService.create(req.body)),
    update: (req, res) => res.json(bookService_1.bookService.update(req.params.id, req.body)),
    delete: (req, res) => {
        bookService_1.bookService.delete(req.params.id);
        res.status(204).send();
    },
};
