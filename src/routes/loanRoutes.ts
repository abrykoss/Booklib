import { Router } from 'express';
import { loanController } from '../controllers/loanController';

const router = Router();

router.post('/', loanController.create);
router.post('/:id/return', loanController.returnBook);
router.get('/', loanController.getAll);

export default router;