// src/controllers/category.controller.ts
import { Request, Response } from 'express';
import Category from '../models/Category.model';

export const getAllCategories = async (_: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories', error: err });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });

    const existing = await Category.findOne({ name });
    if (existing) return res.status(409).json({ message: 'Category already exists' });

    const category = new Category({ name });
    await category.save();

    res.status(201).json({ message: 'Category created', category });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create category', error: err });
  }
};

// Edit category
export const updateCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: 'Category name is required' });

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    // Check for duplicate name
    const existing = await Category.findOne({ name, _id: { $ne: id } });
    if (existing) return res.status(409).json({ message: 'Category with this name already exists' });

    category.name = name;
    await category.save();

    res.status(200).json({ message: 'Category updated', category });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update category', error: err });
  }
};

// Delete category
export const deleteCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json({ message: 'Category deleted', category });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category', error: err });
  }
};

