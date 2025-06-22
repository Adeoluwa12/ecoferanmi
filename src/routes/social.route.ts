import { Router } from 'express';
import {
  sharePost,
  bookmarkPost,
  getBookmarkedPosts
} from '../controllers/social.controller';

const router = Router();

router.post('/posts/:postId/share', sharePost);
router.post('/posts/:postId/bookmark', bookmarkPost);
router.get('/users/:userId/bookmarks', getBookmarkedPosts);

export default router;
