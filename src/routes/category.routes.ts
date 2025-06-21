// src/routes/category.route.ts
import { Router } from 'express';
import { getAllCategories, createCategory } from '../controllers/category.controller';
import checkAdminKey from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getAllCategories);
router.post('/', checkAdminKey, createCategory);

export default router;
