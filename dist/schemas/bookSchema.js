"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookSchema = exports.createBookSchema = void 0;
const zod_1 = require("zod");
exports.createBookSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    author: zod_1.z.string().min(1, 'Author is required'),
    year: zod_1.z.number().int().min(1000).max(new Date().getFullYear() + 1),
    isbn: zod_1.z.string().min(10, 'ISBN must be at least 10 characters'),
});
exports.updateBookSchema = exports.createBookSchema.partial();
