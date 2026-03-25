import prisma from '../db/prisma';

export const bookService = {
    getAll: async () => prisma.book.findMany(),

    getById: async (id: string) => {
        const book = await prisma.book.findUnique({ where: { id } });
        if (!book) throw new Error('Book not found');
        return book;
    },



    create: async (data: { title: string; author: string; year: number; isbn: string }) =>
        prisma.book.create({ data }),

    update: async (id: string, data: Partial<{ title: string; author: string; year: number; isbn: string }>) => {
        const book = await prisma.book.findUnique({ where: { id } });
        if (!book) throw new Error('Book not found');
        return prisma.book.update({ where: { id }, data });
    },

    delete: async (id: string) => {
        const book = await prisma.book.findUnique({ where: { id } });
        if (!book) throw new Error('Book not found');
        return prisma.book.delete({ where: { id } });
    },
};