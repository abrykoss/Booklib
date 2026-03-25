import { Router } from 'express';
import { loanController } from '../controllers/loanController';
import { validate } from '../middleware/validateMiddleware';
import { createLoanSchema } from '../schemas/loanSchema';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, loanController.getAll);
router.post('/', authenticate, validate(createLoanSchema), loanController.create);

router.post('/:id/return', authenticate, loanController.returnBook);


export default router;