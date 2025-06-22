import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

export default mongoose.model('User', userSchema);
