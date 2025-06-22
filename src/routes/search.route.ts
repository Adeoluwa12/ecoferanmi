import { Router } from 'express';
import {
  searchPosts,
  getTrendingPosts,
  getRelatedPosts
} from '../controllers/search.controller';

const router = Router();

router.get('/search', searchPosts);
router.get('/posts/trending', getTrendingPosts);
router.get('/posts/related/:postId', getRelatedPosts);

export default router;
