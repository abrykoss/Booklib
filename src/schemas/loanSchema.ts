import { z } from 'zod';

export const createLoanSchema = z.object({
    bookId: z.string().uuid('bookId must be a valid UUID'),


});