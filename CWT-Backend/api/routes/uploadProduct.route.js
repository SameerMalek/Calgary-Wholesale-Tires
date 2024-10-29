import { Router } from 'express';
import { uploadProductsBulk } from '../controller/productUpload.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();

// Bulk upload route
router.post('/bulk', upload.single('file'), uploadProductsBulk);

export default router;
