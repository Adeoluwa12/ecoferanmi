import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import postRoutes from './routes/post.routes';
import categoryRoutes from './routes/category.routes';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('EcoFeranmi API running');
});
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));