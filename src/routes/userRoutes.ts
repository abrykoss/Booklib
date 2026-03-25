import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';
import { requireAdmin } from '../middleware/roleMiddleware';

const router = Router();

//
router.get('/me', authenticate, userController.getMe);
router.get('/', authenticate, requireAdmin, userController.getAll);
router.get('/:id', authenticate, requireAdmin, userController.getById);
router.post('/', userController.create);

export default router;