import { Router } from 'express';
import { login, register, getMe } from '../controllers/authController';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', isAuthenticated, getMe);

export default router;
