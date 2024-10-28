// multer.middleware.js
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer, { diskStorage } from 'multer';

// Define __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer storage
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export { upload };
