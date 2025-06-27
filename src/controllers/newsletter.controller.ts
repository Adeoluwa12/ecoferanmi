import { Request, Response } from 'express';
import Newsletter from '../models/Newsletter.model';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/mailer';

// SUBSCRIBE
export const subscribe = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body;

    const exists = await Newsletter.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already subscribed' });

    const newSub = await Newsletter.create({ email });

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    const unsubscribeUrl = `${req.protocol}://${req.get('host')}/api/newsletter/unsubscribe/${token}`;

    await sendEmail(
      email,
      'Welcome to Our Newsletter!',
      `
        <h2>Thank you for subscribing!</h2>
        <p>You’ll now receive the latest updates straight to your inbox.</p>
        <p>If you ever want to unsubscribe, click <a href="${unsubscribeUrl}">here</a>.</p>
      `
    );

    res.status(201).json({ message: 'Subscribed and email sent!', data: newSub });
  } catch (err: any) {
    console.error("Subscription Error:", err); // <== Add this
    res.status(500).json({ message: 'Subscription failed', error: err.message || err });
  }
};

// UNSUBSCRIBE via token
export const unsubscribeByToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    await Newsletter.findOneAndDelete({ email: decoded.email });
    res.send('You have been unsubscribed successfully.');
  } catch (err) {
    res.status(400).send('Invalid or expired link.');
  }
};

// ADMIN: Get all subscribers
export const getSubscribers = async (_req: Request, res: Response) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch subscribers', error: err });
  }
};

// ADMIN: Daily subscriber count for analytics
export const getSubscriberGrowth = async (_req: Request, res: Response) => {
  try {
    const result = await Newsletter.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Analytics fetch failed', error: err });
  }
};
