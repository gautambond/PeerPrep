// src/controllers/admin.controller.js
const User = require('../models/User');
const Course = require('../models/Course');
const Media = require('../models/Media');
const cloudinary = require("../config/cloudinary");


exports.listInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: 'instructor' }).select('-password');
    // compute student counts per instructor (aggregate)
    const stats = await Course.aggregate([
      { $group: { _id: '$instructor', totalStudents: { $sum: { $size: '$students' } }, courses: { $push: '$_id' } } }
    ]);
    // merge instructor info with stats
    const mapStats = {};
    stats.forEach(s => { mapStats[s._id.toString()] = s; });
    const result = instructors.map(inst => ({
      _id: inst._id,
      name: inst.name,
      email: inst.email,
      stats: mapStats[inst._id.toString()] || { totalStudents: 0, courses: [] }
    }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to list instructors' });
  }
};

// exports.deleteMedia = async (req, res) => {
//   try {
//     console.log("REQUEST TO DELETE:", req.params.id);

//     const media = await Media.findById(req.params.id);

//     if (!media) {
//       console.log("MEDIA NOT FOUND");
//       return res.status(404).json({ message: "Media not found" });
//     }

//     console.log("MEDIA FOUND:", media);

//     // DELETE FROM CLOUDINARY
//     console.log("Deleting from Cloudinary:", media.publicId, media.type);

//     const result = await cloudinary.uploader.destroy(media.publicId, {
//       resource_type: media.type === "video" ? "video" : "image",
//     });

//     console.log("Cloudinary Response:", result);

//     // If Cloudinary returns 'not found' or 'error'
//     if (result.result !== "ok" && result.result !== "not found") {
//       return res.status(500).json({ message: "Cloudinary delete failed", result });
//     }

//     await media.deleteOne();

//     res.json({ message: "Deleted successfully", result });
//   } catch (err) {
//     console.error("DELETE ERROR:", err);
//     res.status(500).json({ message: "Delete failed", error: err.message });
//   }
// };

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

exports.getAllMedia = async (req, res) => {
  try {
    console.log("ADMIN: Fetching all media...");

    const media = await Media.find()
      .populate("uploadedBy", "name email role")
      .populate("course", "title");

    console.log("ADMIN MEDIA RESULT:", media);

    res.json(media);
  } catch (err) {
    console.error("ADMIN GET MEDIA ERROR:", err);
    res.status(500).json({ message: "Failed to fetch media" });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const { mediaId } = req.params;

    const media = await Media.findById(mediaId);
    if (!media) return res.status(404).json({ message: "Media not found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.type === "video" ? "video" : "image",
    });

    // Remove media reference from Course
    await Course.findByIdAndUpdate(media.course, {
      $pull: { media: media._id },
    });

    // Delete media from DB
    await media.deleteOne();

    res.json({ message: "Media deleted successfully" });

  } catch (err) {
    console.error("Admin Delete Media Error:", err);
    res.status(500).json({ message: "Failed to delete media" });
  }
};
