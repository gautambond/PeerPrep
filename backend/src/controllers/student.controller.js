// src/controllers/student.controller.js
const Course = require('../models/Course');

exports.listCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email');
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to list courses' });
  }
};

exports.enroll = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.user._id;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (!course.students.map(s => s.toString()).includes(studentId.toString())) {
      course.students.push(studentId);
      await course.save();
      await req.user.updateOne({ $addToSet: { enrolledCourses: course._id } });
    }
    res.json({ message: 'Enrolled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Enroll failed' });
  }
};

exports.getCourseMedia = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('media');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    // check permission
    if (req.user.role === 'student' && !course.students.map(s => s.toString()).includes(req.user._id.toString())) {
      return res.status(403).json({ message: 'Enroll to view content' });
    }
    res.json(course.media);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get media' });
  }
};
// student.controller.js
exports.listCourses = async (req, res) => {
  try {
    const all = await Course.find({});
    const enrolled = await Course.find({ students: req.user._id });

    res.json({ all, enrolled });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

