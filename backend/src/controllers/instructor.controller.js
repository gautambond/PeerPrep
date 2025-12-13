


// // src/controllers/instructor.controller.js
// const Course = require('../models/Course');
// const Media = require('../models/Media');
// const User = require('../models/User');
// const cloudinary = require("../config/cloudinary");

// // --------------------- Create Course ---------------------
// exports.createCourse = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const course = new Course({ title, description, instructor: req.user._id });
//     await course.save();
//     res.json(course);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Create course failed' });
//   }
// };

// // --------------------- Upload Media ---------------------
// exports.uploadMedia = async (req, res) => {
//   try {
//     const courseId = req.params.courseId;
//     const course = await Course.findById(courseId);

//     if (!course) return res.status(404).json({ message: 'Course not found' });
//     if (course.instructor.toString() !== req.user._id.toString())
//       return res.status(403).json({ message: 'Not allowed' });
//     if (!req.file)
//       return res.status(400).json({ message: 'No file uploaded' });

//     const file = req.file;

//     const media = new Media({
//       url: file.path,
//       publicId: file.filename,
//       type: file.mimetype.startsWith('video') ? 'video' : 'image',
//       course: course._id,
//       uploadedBy: req.user._id
//     });

//     await media.save();
//     course.media.push(media._id);
//     await course.save();

//     res.json({ message: 'Uploaded', media });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Upload failed' });
//   }
// };

// // --------------------- Add Student ---------------------
// exports.addStudent = async (req, res) => {
//   try {
//     const courseId = req.params.courseId;
//     const { studentId } = req.body;

//     const course = await Course.findById(courseId);

//     if (!course) return res.status(404).json({ message: 'Course not found' });
//     if (course.instructor.toString() !== req.user._id.toString())
//       return res.status(403).json({ message: 'Not allowed' });
//     if (!studentId)
//       return res.status(400).json({ message: 'studentId required' });

//     if (!course.students.includes(studentId)) {
//       course.students.push(studentId);
//       await course.save();

//       await User.findByIdAndUpdate(studentId, {
//         $addToSet: { enrolledCourses: course._id }
//       });
//     }

//     res.json({ message: 'Student added' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Add student failed' });
//   }
// };

// // ======================================================
// // 1️⃣ DELETE MEDIA FROM COURSE
// // ======================================================
// exports.deleteMediaFromCourse = async (req, res) => {
//   try {
//     const { courseId, mediaId } = req.params;

//     const course = await Course.findById(courseId);
//     const media = await Media.findById(mediaId);

//     if (!course) return res.status(404).json({ message: "Course not found" });
//     if (!media) return res.status(404).json({ message: "Media not found" });

//     if (course.instructor.toString() !== req.user._id.toString())
//       return res.status(403).json({ message: "Not allowed" });

//     // Delete from Cloudinary
//     const cloudDeleted = await cloudinary.uploader.destroy(media.publicId, {
//       resource_type: media.type === "video" ? "video" : "image",
//     });

//     console.log("Cloudinary delete:", cloudDeleted);

//     // Remove media reference from course
//     course.media = course.media.filter(
//       (m) => m.toString() !== mediaId.toString()
//     );
//     await course.save();

//     // Delete from DB
//     await media.deleteOne();

//     res.json({ message: "Media deleted successfully" });
//   } catch (err) {
//     console.error("Delete media error:", err);
//     res.status(500).json({ message: "Delete media failed" });
//   }
// };

// // ======================================================
// // 2️⃣ REMOVE STUDENT FROM COURSE
// // ======================================================
// exports.removeStudentFromCourse = async (req, res) => {
//   try {
//     const { courseId, studentId } = req.params;

//     const course = await Course.findById(courseId);

//     if (!course) return res.status(404).json({ message: "Course not found" });

//     if (course.instructor.toString() !== req.user._id.toString())
//       return res.status(403).json({ message: "Not allowed" });

//     // Remove student from course
//     course.students = course.students.filter(
//       (s) => s.toString() !== studentId.toString()
//     );
//     await course.save();

//     // Remove course from student enrolledCourses
//     await User.findByIdAndUpdate(studentId, {
//       $pull: { enrolledCourses: course._id }
//     });

//     res.json({ message: "Student removed successfully" });
//   } catch (err) {
//     console.error("Remove student error:", err);
//     res.status(500).json({ message: "Remove student failed" });
//   }
// };

// // ======================================================
// // 3️⃣ DELETE COURSE + ALL MEDIA + UNENROLL ALL STUDENTS
// // ======================================================
// exports.deleteCourse = async (req, res) => {
//   try {
//     const { courseId } = req.params;

//     const course = await Course.findById(courseId).populate("media");

//     if (!course) return res.status(404).json({ message: "Course not found" });

//     if (course.instructor.toString() !== req.user._id.toString())
//       return res.status(403).json({ message: "Not allowed" });

//     // Delete all media from Cloudinary
//     for (const media of course.media) {
//       await cloudinary.uploader.destroy(media.publicId, {
//         resource_type: media.type === "video" ? "video" : "image",
//       });

//       await media.deleteOne();
//     }

//     // Unenroll all students
//     await User.updateMany(
//       { enrolledCourses: course._id },
//       { $pull: { enrolledCourses: course._id } }
//     );

//     // Remove course itself
//     await course.deleteOne();

//     res.json({ message: "Course deleted successfully" });
//   } catch (err) {
//     console.error("Delete course error:", err);
//     res.status(500).json({ message: "Delete course failed" });
//   }
// };

// // Get all courses an instructor is teaching + student count
// exports.getInstructorCourseStats = async (req, res) => {
//   try {
//     const instructorId = req.user._id;

//     const courses = await Course.find({ instructor: instructorId })
//       .populate("students", "name email");

//     const result = courses.map(course => ({
//       courseId: course._id,
//       title: course.title,
//       totalStudents: course.students.length,
//       students: course.students.map(s => ({
//         _id: s._id,
//         name: s.name,
//         email: s.email
//       }))
//     }));

//     const totalStudentsAcrossAll = result.reduce(
//       (sum, c) => sum + c.totalStudents,
//       0
//     );

//     res.json({
//       instructor: instructorId,
//       totalCourses: courses.length,
//       totalStudents: totalStudentsAcrossAll,
//       courses: result
//     });

//   } catch (err) {
//     console.error("Error in course stats:", err);
//     res.status(500).json({ message: "Failed to fetch instructor course stats" });
//   }
// };


const Course = require('../models/Course');
const Media = require('../models/Media');
const User = require('../models/User');
const cloudinary = require("../config/cloudinary");

// --------------------- Create Course ---------------------
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = new Course({ title, description, instructor: req.user._id });
    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Create course failed' });
  }
};

// --------------------- Upload Media ---------------------
exports.uploadMedia = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.instructor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not allowed' });
    if (!req.file)
      return res.status(400).json({ message: 'No file uploaded' });

    const file = req.file;

    const media = new Media({
      url: file.path,
      publicId: file.filename,
      type: file.mimetype.startsWith('video') ? 'video' : 'image',
      course: course._id,
      uploadedBy: req.user._id
    });

    await media.save();
    course.media.push(media._id);
    await course.save();

    res.json({ message: 'Uploaded', media });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
};

// --------------------- Add Student ---------------------
exports.addStudent = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { studentId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found" });
    if (course.instructor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });
    if (!studentId)
      return res.status(400).json({ message: "studentId required" });

    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();

      await User.findByIdAndUpdate(studentId, {
        $addToSet: { enrolledCourses: course._id }
      });
    }

    res.json({ message: "Student added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Add student failed" });
  }
};

// ======================================================
// 1️⃣ DELETE MEDIA FROM COURSE
// ======================================================
exports.deleteMediaFromCourse = async (req, res) => {
  try {
    const { courseId, mediaId } = req.params;

    const course = await Course.findById(courseId);
    const media = await Media.findById(mediaId);

    if (!course) return res.status(404).json({ message: "Course not found" });
    if (!media) return res.status(404).json({ message: "Media not found" });

    if (course.instructor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    const cloudDeleted = await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.type === "video" ? "video" : "image",
    });

    console.log("Cloudinary delete:", cloudDeleted);

    course.media = course.media.filter(
      (m) => m.toString() !== mediaId.toString()
    );
    await course.save();

    await media.deleteOne();

    res.json({ message: "Media deleted successfully" });
  } catch (err) {
    console.error("Delete media error:", err);
    res.status(500).json({ message: "Delete media failed" });
  }
};

// ======================================================
// 2️⃣ REMOVE STUDENT FROM COURSE
// ======================================================
exports.removeStudentFromCourse = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.instructor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    course.students = course.students.filter(
      (s) => s.toString() !== studentId.toString()
    );
    await course.save();

    await User.findByIdAndUpdate(studentId, {
      $pull: { enrolledCourses: course._id }
    });

    res.json({ message: "Student removed successfully" });
  } catch (err) {
    console.error("Remove student error:", err);
    res.status(500).json({ message: "Remove student failed" });
  }
};

// ======================================================
// 3️⃣ DELETE COURSE + MEDIA + UNENROLL STUDENTS
// ======================================================
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("media");

    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.instructor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    for (const media of course.media) {
      await cloudinary.uploader.destroy(media.publicId, {
        resource_type: media.type === "video" ? "video" : "image",
      });

      await media.deleteOne();
    }

    await User.updateMany(
      { enrolledCourses: course._id },
      { $pull: { enrolledCourses: course._id } }
    );

    await course.deleteOne();

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Delete course error:", err);
    res.status(500).json({ message: "Delete course failed" });
  }
};

// ======================================================
// 4️⃣ REQUIRED → GET ALL COURSES OF INSTRUCTOR
// ======================================================
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user._id;

    const courses = await Course.find({ instructor: instructorId })
      .populate("students", "name email")
      .populate("media");

    const formatted = courses.map((course) => ({
      courseId: course._id,
      title: course.title,
      description: course.description,
      totalStudents: course.students.length,
      mediaCount: course.media.length
    }));

    res.json({ courses: formatted });
  } catch (err) {
    console.error("GET INSTRUCTOR COURSES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch instructor courses" });
  }
};

// ======================================================
// 5️⃣ INSTRUCTOR COURSE STATS
// ======================================================
exports.getInstructorCourseStats = async (req, res) => {
  try {
    const instructorId = req.user._id;

    const courses = await Course.find({ instructor: instructorId })
      .populate("students", "name email");

    const result = courses.map(course => ({
      courseId: course._id,
      title: course.title,
      totalStudents: course.students.length,
      students: course.students.map(s => ({
        _id: s._id,
        name: s.name,
        email: s.email
      }))
    }));

    const totalStudentsAcrossAll = result.reduce(
      (sum, c) => sum + c.totalStudents,
      0
    );

    res.json({
      instructor: instructorId,
      totalCourses: courses.length,
      totalStudents: totalStudentsAcrossAll,
      courses: result
    });

  } catch (err) {
    console.error("Error in course stats:", err);
    res.status(500).json({ message: "Failed to fetch instructor course stats" });
  }
};

// ======================================================
// GET ALL STUDENTS OF A COURSE
// ======================================================
exports.getCourseStudents = async (req, res) => {
  try {
    console.log("📌 Fetching students for course:", req.params.courseId);

    const course = await Course.findById(req.params.courseId)
      .populate("students", "name email");

    if (!course) {
      console.log("❌ Course NOT found");
      return res.status(404).json({ message: "Course not found" });
    }

    console.log("📌 Students found:", course.students);

    res.json({
      students: course.students,
      total: course.students.length,
    });

  } catch (err) {
    console.log("❌ ERROR getCourseStudents:", err);
    res.status(500).json({ message: "Failed to fetch course students" });
  }
};
