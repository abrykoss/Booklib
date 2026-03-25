import prisma from '../db/prisma';
// todo
export const userService = {
    getAll: () => prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, passwordHash: false },
    }),

    getById: async (id: string) => {
        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, name: true, email: true, role: true, passwordHash: false },
        });
        if (!user) throw new Error('User not found');
        return user;
    },

    create: (data: { name: string; email: string }) =>
        prisma.user.create({
            data: { ...data, passwordHash: '', role: 'USER' },
            select: { id: true, name: true, email: true, role: true, passwordHash: false },
        }),

    getMe: async (id: string) => {
        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, name: true, email: true, role: true, passwordHash: false },
        });
        if (!user) throw new Error('User not found');
        return user;
    },
};