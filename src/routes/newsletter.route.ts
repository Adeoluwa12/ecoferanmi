import { Router } from 'express';
import {
  subscribe,
  unsubscribeByToken,
  getSubscribers,
  getSubscriberGrowth
} from '../controllers/newsletter.controller';

const router = Router();

router.post('/newsletter/subscribe', subscribe);
router.get('/newsletter/unsubscribe/:token', unsubscribeByToken);
router.get('/newsletter/subscribers', getSubscribers);
router.get('/newsletter/analytics/growth', getSubscriberGrowth); // Optional dashboard route

export default router;
