import { Router } from 'express';
import { create, getMyOrders, getById, getAllOrders, payOrder } from '../controllers/orderController';
import { isAuthenticated, isAdmin } from '../middleware/auth';

const router = Router();

router.post('/', isAuthenticated, create);
router.get('/', isAuthenticated, getMyOrders);
router.get('/admin/all', isAuthenticated, isAdmin, getAllOrders);
router.get('/:id', isAuthenticated, getById);
router.post('/:id/pay', isAuthenticated, payOrder);

export default router;
