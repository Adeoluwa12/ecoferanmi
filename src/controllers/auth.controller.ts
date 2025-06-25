import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Auth from '../models/Auth.model';

const createToken = (user: any) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d',
  });
};

// Register
export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    const exists = await Auth.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = await Auth.create({ name, email, password });
    const token = createToken(user);

    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err: any) {
    console.error('Registration error:', err.message || err);
    res.status(500).json({ message: 'Registration failed', error: err.message || err });
  }
};


// Login
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user: any = await Auth.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });

    const token = createToken(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
};

// Get user profile
export const profile = async (req: any, res: Response) => {
  try {
    const user = await Auth.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err });
  }
};
