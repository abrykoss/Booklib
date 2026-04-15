import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS,
    },
});

export const sendMail = async (to: string, subject: string, html: string) => {
    await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to,
        subject,
        html,
    });
};