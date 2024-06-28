import multer from 'multer';
import path from 'path';
import crypto from "crypto"

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
    filename: (req, file, cb) => {
      return cb(
        null,
        `${Date.now()}-${crypto.randomBytes(7).toString('hex')}${path.extname(file.originalname)}`
      );
    },
  });
  

// File filter to allow only certain file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const mimeType = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, and PNG files are allowed.'));
  }
};

// Initialize upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: fileFilter
});

export default upload;
