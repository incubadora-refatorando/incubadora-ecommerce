import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/productController';
import { isAuthenticated, isAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', isAuthenticated, isAdmin, create);
router.put('/:id', isAuthenticated, isAdmin, update);
router.delete('/:id', isAuthenticated, isAdmin, remove);

export default router;
