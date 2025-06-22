import { Router } from 'express';
import {
  incrementPostView,
  getPostAnalytics,
  getDashboardAnalytics
} from '../controllers/analytics.controller';

const router = Router();

router.post('/posts/:postId/view', incrementPostView);
router.get('/posts/:postId/analytics', getPostAnalytics);
router.get('/analytics/dashboard', getDashboardAnalytics);

export default router;
