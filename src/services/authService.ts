import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma';
import { AppError } from '../errors/AppError';
import { sendMail } from '../utils/sendMail';

const SALT_ROUNDS = 10;



const sanitizeUser = (user: { id: string; name: string; email: string; role: string; passwordHash: string; avatarUrl?: string | null }) => {
    const { passwordHash, ...safe } = user;

    return safe;
};

export const authService = {
    register: async (data: { name: string; email: string; password: string }) => {
        const existing = await prisma.user.findUnique({ where: { email: data.email } });

        if (existing) throw new AppError('Email already in use', 409);


        const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

        const user = await prisma.user.create({
            data: { name: data.name, email: data.email, passwordHash, role: 'USER' },

        });

        return sanitizeUser(user);
    },

    login: async (data: { email: string; password: string }) => {
        const user = await prisma.user.findUnique({ where: { email: data.email } });
        if (!user) throw new AppError('Invalid email or password', 401);
        const isValid = await bcrypt.compare(data.password, user.passwordHash);
        if (!isValid) throw new AppError('Invalid email or password', 401);


        const payload = { userId: user.id, email: user.email, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        } as jwt.SignOptions);

        return { token, user: sanitizeUser(user) };
    },

    requestPasswordReset: async (data: { email: string }) => {
        const user = await prisma.user.findUnique({ where: { email: data.email } });

        if (user) {
            const resetToken = jwt.sign(
                { email: user.email },
                process.env.JWT_SECRET as string,
                { expiresIn: '10m' } as jwt.SignOptions,
            );

            await sendMail(
                user.email,
                'Скидання пароля',
                `<p>Ваш токен для скидання пароля:</p><pre>${resetToken}</pre><p>Токен дійсний 10 хвилин.</p>`,
            );
        }

        return { message: 'Якщо вказаний email зареєстрований, лист з інструкціями надіслано.' };
    },

    resetPassword: async (data: { token: string; password: string }) => {
        let email: string;

        try {
            const payload = jwt.verify(data.token, process.env.JWT_SECRET as string) as { email: string };
            email = payload.email;
        } catch {
            throw new AppError('Invalid or expired token', 400);
        }

        const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

        await prisma.user.update({
            where: { email },
            data: { passwordHash },
        });

        return { message: 'Пароль успішно змінено.' };
    },
};