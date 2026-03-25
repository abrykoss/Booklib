import { Router } from 'express';
import { bookController } from '../controllers/bookController';
import { validate } from '../middleware/validateMiddleware';
import { authenticate } from '../middleware/authMiddleware';
import { requireAdmin } from '../middleware/roleMiddleware';
import { createBookSchema, updateBookSchema } from '../schemas/bookSchema';

const router = Router();

router.get('/', bookController.getAll);
router.get('/:id', bookController.getById);
router.post('/', authenticate, requireAdmin, validate(createBookSchema), bookController.create);
router.put('/:id', authenticate, requireAdmin, validate(updateBookSchema), bookController.update);

router.delete('/:id', authenticate, requireAdmin, bookController.delete);

export default router;