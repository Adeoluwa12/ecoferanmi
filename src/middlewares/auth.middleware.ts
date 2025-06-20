import { Request, Response, NextFunction } from 'express';

const checkAdminKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({ message: 'Unauthorized' });
    return; // Ensure the function ends here, no need to return Response
  }
  next();
};

export default checkAdminKey;
