"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const inMemoryStorage_1 = require("../storage/inMemoryStorage");
const bookSchema_1 = require("../schemas/bookSchema");
const crypto_1 = require("crypto");
exports.bookService = {
    getAll: () => Array.from(inMemoryStorage_1.books.values()),
    getById: (id) => inMemoryStorage_1.books.get(id),
    create: (data) => {
        const validated = bookSchema_1.createBookSchema.parse(data);
        const book = {
            id: (0, crypto_1.randomUUID)(),
            ...validated,
            available: true,
        };
        inMemoryStorage_1.books.set(book.id, book);
        return book;
    },
    update: (id, data) => {
        const book = inMemoryStorage_1.books.get(id);
        if (!book)
            throw new Error('Book not found');
        const validated = bookSchema_1.updateBookSchema.parse(data);
        const updated = { ...book, ...validated };
        inMemoryStorage_1.books.set(id, updated);
        return updated;
    },
    delete: (id) => {
        if (!inMemoryStorage_1.books.has(id))
            throw new Error('Book not found');
        inMemoryStorage_1.books.delete(id);
    },
};
