import { Request, Response } from 'express';
import Post from '../models/Post.model';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, tags, category } = req.body;
    const post = new Post({ title, content, tags, category });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create post', error: err });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, tag, search } = req.query;
    const query: any = {};

    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const posts = await Post.find(query)
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Post.countDocuments(query);

    res.status(200).json({
      currentPage: +page,
      totalPages: Math.ceil(total / +limit),
      totalPosts: total,
      posts,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts', error: err });
  }
};

export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug }).populate('category', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post', error: err });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: 'Error updating post', error: err });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post', error: err });
  }
};