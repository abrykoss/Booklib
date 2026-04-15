import express from 'express';
import path from 'path';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';
import loanRoutes from './routes/loanRoutes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/loans', loanRoutes);

app.use(errorHandler);

export default app;