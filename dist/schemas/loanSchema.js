"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoanSchema = void 0;
const zod_1 = require("zod");
exports.createLoanSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, 'userId is required'),
    bookId: zod_1.z.string().min(1, 'bookId is required'),
});
