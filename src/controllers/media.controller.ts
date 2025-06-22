import { Request, Response } from 'express';

export const uploadMedia = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  res.json({
    message: 'File uploaded',
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  });
};
