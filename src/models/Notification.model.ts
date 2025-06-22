// src/models/Notification.model.ts
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    link: { type: String }, // Optional: link to related resource
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
