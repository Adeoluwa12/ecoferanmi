import { Request, Response } from 'express';
import Category from '../models/Category.model';

export const getAllCategories = async (_: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories', error: err });
  }
};