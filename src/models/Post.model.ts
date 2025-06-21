// src/models/Post.model.ts
import mongoose from 'mongoose';
import slugify from 'slugify';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [{ type: String }],
    coverImage: { type: String },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Auto-generate slug from title
postSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('Post', postSchema);
