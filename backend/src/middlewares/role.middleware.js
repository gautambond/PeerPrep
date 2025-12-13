// // src/middlewares/role.middleware.js
// function permit(...allowedRoles) {
//   return (req, res, next) => {
//     if (!req.user) return res.status(401).json({ message: 'Unauthenticated' });
//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }
//     next();
//   };
// }

// module.exports = { permit };


// src/middlewares/role.middleware.js

// module.exports = function (requiredRole) {
//   return (req, res, next) => {
//     try {
//       if (!req.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//       }

//       if (req.user.role !== requiredRole) {
//         return res.status(403).json({ message: "Access denied" });
//       }

//       next();
//     } catch (err) {
//       console.error("Role middleware error:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   };
// };


// src/middlewares/role.middleware.js
module.exports = function (...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
