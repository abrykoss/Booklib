"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanService = void 0;
const inMemoryStorage_1 = require("../storage/inMemoryStorage");
const loanSchema_1 = require("../schemas/loanSchema");
const crypto_1 = require("crypto");
exports.loanService = {
    create: (data) => {
        const { userId, bookId } = loanSchema_1.createLoanSchema.parse(data);
        const book = inMemoryStorage_1.books.get(bookId);
        if (!book)
            throw new Error('Book not found');
        if (!book.available)
            throw new Error('Book is not available');
        // Перевіряємо чи немає активної позики
        const activeLoan = Array.from(inMemoryStorage_1.loans.values()).find(l => l.bookId === bookId && l.status === 'ACTIVE');
        if (activeLoan)
            throw new Error('Book already on loan');
        const loan = {
            id: (0, crypto_1.randomUUID)(),
            userId,
            bookId,
            loanDate: new Date(),
            returnDate: null,
            status: 'ACTIVE',
        };
        inMemoryStorage_1.loans.set(loan.id, loan);
        book.available = false; // бізнес-логіка
        inMemoryStorage_1.books.set(bookId, book);
        return loan;
    },
    returnBook: (loanId) => {
        const loan = inMemoryStorage_1.loans.get(loanId);
        if (!loan || loan.status === 'RETURNED')
            throw new Error('Loan not found or already returned');
        loan.status = 'RETURNED';
        loan.returnDate = new Date();
        const book = inMemoryStorage_1.books.get(loan.bookId);
        if (book) {
            book.available = true;
            inMemoryStorage_1.books.set(loan.bookId, book);
        }
        inMemoryStorage_1.loans.set(loanId, loan);
        return loan;
    },
    getAll: () => Array.from(inMemoryStorage_1.loans.values()),
};
