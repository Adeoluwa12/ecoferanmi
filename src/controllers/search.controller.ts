import { Request, Response } from 'express';
import Post from '../models/Post.model';
import PostView from '../models/Postview.model';

// Full-text search
export const searchPosts = async (req: Request, res: Response):Promise<any> => {
  try {
    const query = req.query.q as string;
    if (!query) return res.status(400).json({ message: 'Search query is required' });

    const results = await Post.find({
      $text: { $search: query },
      isPublished: true,
    }).select('title slug excerpt tags createdAt');

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err });
  }
};

// Trending posts (based on views)
export const getTrendingPosts = async (_req: Request, res: Response) => {
  try {
    const views = await PostView.find()
      .sort({ views: -1 })
      .limit(5)
      .populate('postId', 'title slug excerpt');

      const trending = views.map((v) => {
        const post = (v.postId as any).toObject?.(); // safely convert populated doc to plain object
        return {
          ...post,
          views: v.views,
        };
      });

    res.json(trending);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trending posts', error: err });
  }
};

// Related posts (same category or tags)
export const getRelatedPosts = async (req: Request, res: Response): Promise<any> => {
  try {
    const { postId } = req.params;
    const currentPost = await Post.findById(postId);

    if (!currentPost) return res.status(404).json({ message: 'Post not found' });

    const related = await Post.find({
      _id: { $ne: postId },
      $or: [
        { category: currentPost.category },
        { tags: { $in: currentPost.tags } },
      ],
      isPublished: true,
    })
      .limit(5)
      .select('title slug excerpt');

    res.json(related);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch related posts', error: err });
  }
};
