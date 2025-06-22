import { Request, Response } from 'express';
import Post from '../models/Post.model';
import User from '../models/User.model';

// Track post share
export const sharePost = async (req: Request, res: Response) => {
  try {
    const { platform } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $inc: { shares: 1 },
        ...(platform && {
          $push: { sharedBy: { platform } }
        })
      },
      { new: true }
    );

    res.status(200).json({ message: 'Post shared', post });
  } catch (err) {
    res.status(500).json({ message: 'Error sharing post', error: err });
  }
};

// Bookmark post
export const bookmarkPost = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndUpdate(userId, {
      $addToSet: { bookmarks: req.params.postId }
    });

    res.status(200).json({ message: 'Post bookmarked' });
  } catch (err) {
    res.status(500).json({ message: 'Error bookmarking post', error: err });
  }
};

// Get all bookmarked posts
export const getBookmarkedPosts = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('bookmarks', 'title slug excerpt coverImage')
      .lean();

    res.status(200).json(user?.bookmarks || []);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookmarks', error: err });
  }
};
