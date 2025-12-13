// src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const instrRoutes = require('./routes/instructor.routes');
const studentRoutes = require('./routes/student.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/instructor', instrRoutes);
app.use('/api/student', studentRoutes);

// health check
app.get('/health', (req, res) => res.json({ ok: true }));

// global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

module.exports = app;
