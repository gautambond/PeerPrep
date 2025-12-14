
// src/controllers/student.controller.js
const Course = require("../models/Course");
const User = require("../models/User");
const sendEmail = require("../services/email.service"); // ✅ already exists

// ---------------- LIST COURSES ----------------
exports.listCourses = async (req, res) => {
  try {
    const all = await Course.find({})
      .populate("instructor", "name email");

    const enrolled = await Course.find({ students: req.user._id });

    res.json({ all, enrolled });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// ---------------- ENROLL COURSE (UPDATED) ----------------
exports.enroll = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.user._id;

    const course = await Course.findById(courseId)
      .populate("instructor", "name email");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Already enrolled check
    if (course.students.includes(studentId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    // Enroll student
    course.students.push(studentId);
    await course.save();

    await User.findByIdAndUpdate(studentId, {
      $addToSet: { enrolledCourses: course._id },
    });

    const student = await User.findById(studentId);

    /* ================= EMAIL TO STUDENT ================= */
    await sendEmail({
      to: student.email,
      subject: "Course Enrollment Successful 🎉",
      html: `
        <h3>Enrollment Successful</h3>
        <p>You have enrolled in <b>${course.title}</b></p>
        <p>Instructor: <b>${course.instructor.name}</b></p>
      `,
    });

    /* ================= EMAIL TO INSTRUCTOR ================= */
    await sendEmail({
      to: course.instructor.email,
      subject: "New Student Enrolled 👨‍🎓",
      html: `
        <h3>New Enrollment</h3>
        <p><b>${student.name}</b> has enrolled in your course</p>
        <p>Email: ${student.email}</p>
        <p>Course: <b>${course.title}</b></p>
      `,
    });

    res.json({ message: "Enrolled successfully" });

  } catch (err) {
    console.error("Enroll failed:", err);
    res.status(500).json({ message: "Enroll failed" });
  }
};

// ---------------- GET COURSE MEDIA ----------------
exports.getCourseMedia = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate("media");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (
      req.user.role === "student" &&
      !course.students.includes(req.user._id)
    ) {
      return res.status(403).json({ message: "Enroll to view content" });
    }

    res.json(course.media);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get media" });
  }
};
