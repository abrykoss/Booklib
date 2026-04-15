import prisma from '../db/prisma';
import { AppError } from '../errors/AppError';

export const loanService = {
    create: async (data: { bookId: string; userId: string }) => {
        const book = await prisma.book.findUnique({ where: { id: data.bookId } });
        if (!book) throw new AppError('Book not found', 404);
        if (!book.available) throw new AppError('Book is not available', 409);


        const activeLoan = await prisma.loan.findFirst({
            where: { bookId: data.bookId, status: 'ACTIVE' },
        });
        if (activeLoan) throw new AppError('Book already on loan', 409);

        const loan = await prisma.loan.create({
            data: { userId: data.userId, bookId: data.bookId, status: 'ACTIVE' },
        });

        await prisma.book.update({ where: { id: data.bookId }, data: { available: false } });

        return loan;
    },


    returnBook: async (loanId: string, userId: string, role: string) => {
        const loan = await prisma.loan.findUnique({ where: { id: loanId } });
        if (!loan || loan.status === 'RETURNED') throw new AppError('Loan not found or already returned', 404);

        if (role !== 'ADMIN' && loan.userId !== userId) throw new AppError('Loan not found or already returned', 404);

        const updatedLoan = await prisma.loan.update({
            where: { id: loanId },
            data: { status: 'RETURNED', returnDate: new Date() },
        });


        await prisma.book.update({ where: { id: loan.bookId }, data: { available: true } });


        return updatedLoan;
    },

    getAll: (userId: string, role: string) => {
        if (role === 'ADMIN') {
            return prisma.loan.findMany({
                include: {
                    book: true,
                    user: { select: { id: true, name: true, email: true, role: true } },
                },
            });
        }

        return prisma.loan.findMany({ where: { userId }, include: { book: true } });
    },
};