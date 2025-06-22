import { Request, Response } from 'express';
import Comment from '../models/Comment.model';

// POST /api/posts/:postId/comments
export const createComment = async (req: Request, res: Response) => {
  try {
    const { author, email, content, parentCommentId } = req.body;
    const newComment = await Comment.create({
      postId: req.params.postId,
      author,
      email,
      content,
      parentCommentId: parentCommentId || null,
    });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create comment', error: err });
  }
};

// GET /api/posts/:postId/comments
export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
      parentCommentId: null,
    })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comments', error: err });
  }
};

// PUT /api/comments/:commentId
export const updateComment = async (req: Request, res: Response) => {
  try {
    const updated = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update comment', error: err });
  }
};

// DELETE /api/comments/:commentId
export const deleteComment = async (req: Request, res: Response) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comment', error: err });
  }
};

// POST /api/comments/:commentId/reply
export const replyToComment = async (req: Request, res: Response) => {
  try {
    const { author, email, content } = req.body;
    const reply = await Comment.create({
      postId: req.body.postId,
      author,
      email,
      content,
      parentCommentId: req.params.commentId,
    });
    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ message: 'Failed to reply', error: err });
  }
};

// POST /api/comments/:commentId/like
export const toggleLike = async (req: Request, res: Response): Promise<any> => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    const increment = req.body.like ? 1 : -1;
    comment.likes += increment;
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to like/unlike', error: err });
  }
};

// GET /api/comments/:commentId/replies
export const getReplies = async (req: Request, res: Response) => {
  try {
    const replies = await Comment.find({ parentCommentId: req.params.commentId });
    res.json(replies);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch replies', error: err });
  }
};
