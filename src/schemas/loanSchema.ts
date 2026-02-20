import { z } from 'zod';

export const createLoanSchema = z.object({
    userId: z.string().uuid('userId must be a valid UUID'),

    //
    bookId: z.string().uuid('bookId must be a valid UUID'),
});