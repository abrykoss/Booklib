import prisma from '../db/prisma';
import { AppError } from '../errors/AppError';

export const bookService = {
    getAll: async () => prisma.book.findMany(),

    getById: async (id: string) => {
        const book = await prisma.book.findUnique({ where: { id } });
        if (!book) throw new AppError('Book not found', 404);
        return book;
    },



    create: async (data: { title: string; author: string; year: number; isbn: string }) =>
        prisma.book.create({ data }),

    update: async (id: string, data: Partial<{ title: string; author: string; year: number; isbn: string }>) => {
        const book = await prisma.book.findUnique({ where: { id } });
        if (!book) throw new AppError('Book not found', 404);
        return prisma.book.update({ where: { id }, data });
    },

    delete: async (id: string) => {
        const book = await prisma.book.findUnique({ where: { id } });
        if (!book) throw new AppError('Book not found', 404);
        return prisma.book.delete({ where: { id } });
    },
};