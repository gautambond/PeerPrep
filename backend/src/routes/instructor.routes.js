// src/routes/instructor.routes.js
const router = require("express").Router();
const instructorController = require("../controllers/instructor.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");

// Only instructors can access these routes
router.use(auth, role("instructor"));

// ------------------------------------------------------
// 🆕 0️⃣ GET ALL COURSES FOR THIS INSTRUCTOR
// ------------------------------------------------------
router.get("/courses", instructorController.getInstructorCourses);

// ------------------------------------------------------
// 1️⃣ CREATE COURSE
// ------------------------------------------------------
router.post("/course", instructorController.createCourse);


// ------------------------------------------------------
// 2️⃣ UPLOAD MEDIA (Image / Video)
// ------------------------------------------------------
router.post(
  "/course/:courseId/media",
  upload.single("file"),  // field name must be "file"
  instructorController.uploadMedia
);


// ------------------------------------------------------
// 3️⃣ ADD STUDENT TO COURSE
// ------------------------------------------------------
router.post("/course/:courseId/add-student", instructorController.addStudent);


router.get("/course/:courseId/students", instructorController.getCourseStudents);

//router.get("/course/:courseId/students", instructorController.getCourseStudent);




// ------------------------------------------------------
// 4️⃣ DELETE MEDIA FROM COURSE
// ------------------------------------------------------
router.delete(
  "/course/:courseId/media/:mediaId",
  instructorController.deleteMediaFromCourse
);


// ------------------------------------------------------
// 5️⃣ REMOVE STUDENT FROM COURSE
// ------------------------------------------------------
router.delete(
  "/course/:courseId/student/:studentId",
  instructorController.removeStudentFromCourse
);


// ------------------------------------------------------
// 6️⃣ DELETE ENTIRE COURSE (Remove videos + unenroll students)
// ------------------------------------------------------
router.delete("/course/:courseId", instructorController.deleteCourse);



router.get("/stats/courses", instructorController.getInstructorCourseStats);



module.exports = router;
