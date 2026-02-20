import { loans, books, users } from '../storage/inMemoryStorage';
import { Loan } from '../types';
import { createLoanSchema } from '../schemas/loanSchema';
import { randomUUID } from 'crypto';

export const loanService = {
    create: (data: unknown) => {
        const { userId, bookId } = createLoanSchema.parse(data);

        const user = users.get(userId);
        if (!user) throw new Error('User not found');

        const book = books.get(bookId);
        if (!book) throw new Error('Book not found');
        if (!book.available) throw new Error('Book is not available');

        const activeLoan = Array.from(loans.values()).find(
            l => l.bookId === bookId && l.status === 'ACTIVE'
        );
        if (activeLoan) throw new Error('Book already on loan');

        const loan: Loan = {
            id: randomUUID(),
            userId,
            bookId,
            loanDate: new Date(),
            returnDate: null,
            status: 'ACTIVE',
        };

        loans.set(loan.id, loan);
        books.set(bookId, { ...book, available: false });

        return loan;
    },

    returnBook: (loanId: string) => {
        const loan = loans.get(loanId);
        if (!loan || loan.status === 'RETURNED') throw new Error('Loan not found or already returned');

        const updatedLoan: Loan = { ...loan, status: 'RETURNED', returnDate: new Date() };
        loans.set(loanId, updatedLoan);

        const book = books.get(loan.bookId);
        if (book) books.set(loan.bookId, { ...book, available: true });

        return updatedLoan;
    },

    getAll: () => Array.from(loans.values()),
};