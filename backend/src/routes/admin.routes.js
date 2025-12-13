// // src/routes/admin.routes.js
// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/auth.middleware');
// const { permit } = require('../middlewares/role.middleware');
// const admin = require('../controllers/admin.controller');

// router.use(auth, permit('admin'));

// router.get('/instructors', admin.listInstructors);
// router.delete('/media/:id', admin.deleteMedia);

// module.exports = router;


// src/routes/admin.routes.js
const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// only ADMIN can access these routes
router.use(auth, role("admin"));

// Example admin endpoints:
router.get("/users", adminController.getAllUsers);
router.delete("/media/:mediaId", adminController.deleteMedia);


router.get("/media", adminController.getAllMedia);


module.exports = router;
