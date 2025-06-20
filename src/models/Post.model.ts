import mongoose from 'mongoose';
import slugify from 'slugify';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true },
  tags: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
}, { timestamps: true });

postSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('Post', postSchema);