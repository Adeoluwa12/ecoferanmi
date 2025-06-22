import { Router } from 'express';
import { register, login, profile } from '../controllers/auth.controller';
import { protect } from '../middlewares/auths.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, profile);

export default router;
