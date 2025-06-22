import { Router } from 'express';
import { uploadMedia } from '../controllers/media.controller';
import { upload } from '../middlewares/upload';

const router = Router();

router.post('/media/upload', upload.single('file'), uploadMedia);

export default router;
