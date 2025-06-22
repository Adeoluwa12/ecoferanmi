import cron from 'node-cron';
import Post from '../models/Post.model';

export const runPostScheduler = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();

    const posts = await Post.updateMany(
      { isDraft: true, scheduledFor: { $lte: now } },
      { $set: { isDraft: false }, $unset: { scheduledFor: '' } }
    );

    if (posts.modifiedCount > 0) {
      console.log(`${posts.modifiedCount} posts published`);
    }
  });
};
