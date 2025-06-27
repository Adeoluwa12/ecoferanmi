// src/routes/category.route.ts
import { Router } from 'express';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller';
import checkAdminKey from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getAllCategories);
router.post('/', checkAdminKey, createCategory);
router.put('/:id', checkAdminKey, updateCategory);
router.delete('/:id', checkAdminKey, deleteCategory);


export default router;
