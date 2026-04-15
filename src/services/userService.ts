import prisma from '../db/prisma';
import { AppError } from '../errors/AppError';
import fs from 'fs';
import path from 'path';
// todo
const select = { id: true, name: true, email: true, role: true, passwordHash: false, avatarUrl: true };

export const userService = {
    getAll: () => prisma.user.findMany({
        select,
    }),

    getById: async (id: string) => {
        const user = await prisma.user.findUnique({
            where: { id },
            select,
        });
        if (!user) throw new AppError('User not found', 404);
        return user;
    },

    create: (data: { name: string; email: string }) =>
        prisma.user.create({
            data: { ...data, passwordHash: '', role: 'USER' },
            select,
        }),

    getMe: async (id: string) => {
        const user = await prisma.user.findUnique({
            where: { id },
            select,
        });
        if (!user) throw new AppError('User not found', 404);
        return user;
    },

    uploadAvatar: async (userId: string, filename: string) => {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new AppError('User not found', 404);

        if (user.avatarUrl) {
            const oldPath = path.join(process.cwd(), user.avatarUrl);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        const avatarUrl = `/uploads/avatars/${filename}`;

        await prisma.user.update({ where: { id: userId }, data: { avatarUrl } });

        return { message: 'Аватарку успішно оновлено.', avatarUrl };
    },

    deleteAvatar: async (userId: string) => {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new AppError('User not found', 404);

        if (!user.avatarUrl) throw new AppError('Avatar not found', 404);

        const filePath = path.join(process.cwd(), user.avatarUrl);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        await prisma.user.update({ where: { id: userId }, data: { avatarUrl: null } });

        return { message: 'Аватарку видалено.' };
    },
};