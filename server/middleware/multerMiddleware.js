import multer from "multer";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";

// Menggunakan import.meta.url untuk mendapatkan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tentukan jalur absolut ke folder uploads di dalam direktori client/public
const uploadPath = path.resolve(__dirname, "../../client/public/uploads");

// Pastikan direktori upload ada, jika tidak, buat direktori
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
