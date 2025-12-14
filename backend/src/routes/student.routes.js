
// src/routes/student.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const student = require('../controllers/student.controller');

// All student routes require login
router.use(auth);

// GET all courses (student, instructor, admin allowed)
router.get(
  '/courses',
  role('student', 'instructor', 'admin'),
  student.listCourses
);

// ENROLL in a course (only student allowed)
router.post(
  '/course/:courseId/enroll',
  role('student'),
  student.enroll
);

// GET course media (student, instructor, admin allowed)
router.get(
  '/course/:courseId/media',
  role('student', 'instructor', 'admin'),
  student.getCourseMedia
);

module.exports = router;
