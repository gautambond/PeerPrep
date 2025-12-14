
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
