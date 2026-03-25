import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma';

const SALT_ROUNDS = 10;



const sanitizeUser = (user: { id: string; name: string; email: string; role: string; passwordHash: string }) => {
    const { passwordHash, ...safe } = user;

    return safe;
};

export const authService = {
    register: async (data: { name: string; email: string; password: string }) => {
        const existing = await prisma.user.findUnique({ where: { email: data.email } });

        if (existing) throw new Error('Email already in use');


        const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

        const user = await prisma.user.create({
            data: { name: data.name, email: data.email, passwordHash, role: 'USER' },

        });

        return sanitizeUser(user);
    },

    login: async (data: { email: string; password: string }) => {
        const user = await prisma.user.findUnique({ where: { email: data.email } });
        if (!user) throw new Error('Invalid email or password');
        const isValid = await bcrypt.compare(data.password, user.passwordHash);
        if (!isValid) throw new Error('Invalid email or password');


        const payload = { userId: user.id, email: user.email, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        } as jwt.SignOptions);

        return { token, user: sanitizeUser(user) };
    },
};