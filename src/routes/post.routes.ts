import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostBySlug,
  updatePost,
} from '../controllers/post.controller';
import checkAdminKey from '../middlewares/auth.middleware';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    await getAllPosts(req, res);
  } catch (err) {
    next(err);
  }
});

router.get('/slug/:slug', async (req, res, next) => {
  try {
    await getPostBySlug(req, res);
  } catch (err) {
    next(err);
  }
});

router.post('/', checkAdminKey, async (req, res, next) => {
  try {
    await createPost(req, res);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', checkAdminKey, async (req, res, next) => {
  try {
    await updatePost(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', checkAdminKey, async (req, res, next) => {
  try {
    await deletePost(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;