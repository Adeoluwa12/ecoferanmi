import { Request, Response } from 'express';
import PostView from '../models/Postview.model';
import { getTodayDate } from '../utils/date';

// Increment post view
export const incrementPostView = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const today = getTodayDate();

    let postView = await PostView.findOne({ postId });

    if (!postView) {
      postView = new PostView({
        postId,
        views: 1,
        dailyViews: [{ date: today, count: 1 }],
      });
    } else {
      postView.views += 1;

      const todayView = postView.dailyViews.find((v) => v.date === today);
      if (todayView) {
        todayView.count += 1;
      } else {
        postView.dailyViews.push({ date: today, count: 1 });
      }
    }

    await postView.save();
    res.status(200).json({ message: 'View recorded.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to track view', error: err });
  }
};

// Get analytics for a post
export const getPostAnalytics = async (req: Request, res: Response): Promise<any> => {
  try {
    const { postId } = req.params;
    const postAnalytics = await PostView.findOne({ postId });
    if (!postAnalytics) return res.status(404).json({ message: 'No analytics yet' });

    res.json(postAnalytics);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch post analytics', error: err });
  }
};

// Global dashboard analytics
export const getDashboardAnalytics = async (_req: Request, res: Response) => {
  try {
    const data = await PostView.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$views' },
          totalPostsTracked: { $sum: 1 },
        },
      },
    ]);

    res.json(data[0] || { totalViews: 0, totalPostsTracked: 0 });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard data', error: err });
  }
};
