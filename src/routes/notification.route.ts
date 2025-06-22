import { Router } from 'express';
import { getNotifications, markAllRead } from '../controllers/notification.controller';
import { protect } from '../middlewares/auths.middleware';

const router = Router();

router.get('/', protect, getNotifications);
router.post('/mark-read', protect, markAllRead);



export default router;
