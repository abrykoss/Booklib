import { books } from '../storage/inMemoryStorage';
import { Book } from '../types';
import { createBookSchema, updateBookSchema } from '../schemas/bookSchema';
import { randomUUID } from 'crypto';

export const bookService = {
    getAll: () => Array.from(books.values()),

    getById: (id: string) => books.get(id),

    create: (data: unknown) => {
        const validated = createBookSchema.parse(data);
        const book: Book = {
            id: randomUUID(),
            ...validated,
            available: true,
        };
        books.set(book.id, book);
        return book;
    },

    update: (id: string, data: unknown) => {
        const book = books.get(id);
        if (!book) throw new Error('Book not found');
        const validated = updateBookSchema.parse(data);
        const updated = { ...book, ...validated };
        books.set(id, updated);
        return updated;
    },

    delete: (id: string) => {
        if (!books.has(id)) throw new Error('Book not found');
        books.delete(id);
    },
};