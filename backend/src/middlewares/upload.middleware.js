// src/middlewares/upload.middleware.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: 'mentoring_platform',
    resource_type: 'auto', // 'image' or 'video' automatically
    public_id: `${Date.now()}-${file.originalname}`.replace(/\s+/g, '-'),
  })
});

const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024 // 200MB max for video; tune as needed
  },
  fileFilter: (req, file, cb) => {
    // allow images and videos
    if (/image|video/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Unsupported file type'), false);
  }
});

module.exports = upload;
