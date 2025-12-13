// src/config/cloudinary.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.warn('CLOUDINARY env vars not set — uploads will fail until configured');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

module.exports = cloudinary;
