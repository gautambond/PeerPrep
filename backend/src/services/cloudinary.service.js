// src/services/cloudinary.service.js
const cloudinary = require('../config/cloudinary');

/**
 * deleteResource - remove resource by publicId
 * type: 'image' | 'video'
 */
async function deleteResource(publicId, type = 'image') {
  try {
    return cloudinary.uploader.destroy(publicId, {
      resource_type: type === 'video' ? 'video' : 'image'
    });
  } catch (err) {
    throw err;
  }
}

module.exports = { deleteResource };
