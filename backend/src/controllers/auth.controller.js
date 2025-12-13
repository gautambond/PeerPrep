// // src/controllers/auth.controller.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// function signToken(user) {
//   return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
// }

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     if (!['admin','instructor','student'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
//     if (await User.findOne({ email })) return res.status(400).json({ message: 'Email in use' });
//     const user = new User({ name, email, password, role });
//     await user.save();
//     const token = signToken(user);
//     res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Registration failed' });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });
//     const ok = await user.comparePassword(password);
//     if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
//     const token = signToken(user);
//     res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Login failed' });
//   }
// };



// src/controllers/auth.controller.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
}

// ======================= REGISTER =======================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["admin", "instructor", "student"].includes(role))
      return res.status(400).json({ message: "Invalid role" });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email in use" });

    const user = new User({ name, email, password, role });
    await user.save();

    const token = signToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

// ======================= LOGIN =======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("\n===== LOGIN DEBUG =====");
    console.log("Incoming email:", email);
    console.log("Incoming password:", password);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User NOT found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✔ User found:", user.email);
    console.log("DB hashed password:", user.password);

    const ok = await user.comparePassword(password);
    console.log("Password match:", ok);

    if (!ok) {
      console.log("❌ Incorrect password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user);

    console.log("✔ LOGIN SUCCESS");

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

