import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import postRoutes from './routes/post.routes';
import categoryRoutes from './routes/category.routes';
import commentRoutes from './routes/comment.route';
import newsletterRoutes from './routes/newsletter.route';
import analyticsRoutes from './routes/analytics.route';
import searchRoutes from './routes/search.route';
import socialRoutes from './routes/social.route';
import path from 'path';
import { runPostScheduler } from './utils/cron.scheduler';
import notificationRoutes from './routes/notification.route';
import authRoutes from './routes/auth.route'
import mediaroutes from './routes/media.route'


dotenv.config();

connectDB();/

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('EcoFeranmi API running');
});


app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes);
app.use('/api', commentRoutes);
app.use('/api', newsletterRoutes);
app.use('/api', analyticsRoutes);
app.use('/api', searchRoutes);
app.use('/api', socialRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api', mediaroutes, express.static(path.join(__dirname, '../uploads')));
app.use('/notifications', notificationRoutes);

runPostScheduler();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));