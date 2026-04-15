import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validate } from '../middleware/validateMiddleware';
import { registerSchema, loginSchema, requestPasswordResetSchema, resetPasswordSchema } from '../schemas/authSchema';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);

router.post('/login', validate(loginSchema), authController.login);

router.post('/request-password-reset', validate(requestPasswordResetSchema), authController.requestPasswordReset);

router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);

export default router;