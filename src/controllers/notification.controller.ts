import { Request, Response } from 'express';
import Notification from '../models/Notification.model';

export const getNotifications = async (req: any, res: Response) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: err });
  }
};

export const markAllRead = async (req: any, res: Response) => {
  try {
    await Notification.updateMany({ userId: req.user.id, isRead: false }, { $set: { isRead: true } });
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark notifications as read', error: err });
  }
};
