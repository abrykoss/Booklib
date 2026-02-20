import { z } from 'zod';

export const createBookSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    author: z.string().min(1, 'Author is required'),
    year: z.number().int().min(1000).max(new Date().getFullYear() + 1),
    isbn: z.string().min(10, 'ISBN must be at least 10 characters'),
});



export const updateBookSchema = createBookSchema.partial();