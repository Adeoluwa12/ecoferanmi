import { Router } from 'express';
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
  replyToComment,
  toggleLike,
  getReplies,
} from '../controllers/comment.controller';

const router = Router();

router.post('/posts/:postId/comments', createComment);
router.get('/posts/:postId/comments', getComments);
router.put('/comments/:commentId', updateComment);
router.delete('/comments/:commentId', deleteComment);
router.post('/comments/:commentId/reply', replyToComment);
router.post('/comments/:commentId/like', toggleLike);
router.get('/comments/:commentId/replies', getReplies);

export default router;
