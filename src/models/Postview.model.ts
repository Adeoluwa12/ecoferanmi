import mongoose from 'mongoose';

const postViewSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    views: { type: Number, default: 0 },
    dailyViews: [
      {
        date: String, // e.g., '2024-06-20'
        count: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('PostView', postViewSchema);
