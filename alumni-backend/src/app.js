const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
// const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
// const mongoSanitize = require('express-mongo-sanitize'); ❌ REMOVE THIS
const config = require('./config');
const routes = require('./routes');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Security middleware
app.use(helmet()); // Set security headers
// app.use(xss()); // Prevent XSS attacks

// ✅ Custom sanitizer (avoids req.query)
app.use((req, res, next) => {
  const sanitize = (obj) => {
    for (const prop in obj) {
      if (typeof obj[prop] === 'object' && obj[prop] !== null) {
        sanitize(obj[prop]);
      }
      if (prop.startsWith('$') || prop.includes('.')) {
        delete obj[prop];
      }
    }
  };

  sanitize(req.body);
  sanitize(req.params);
  // ❌ Don't touch req.query to avoid breaking Node/Express

  next();
});

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100
});
app.use('/api', limiter);

// Logging
if (config.environment === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api', routes);

// Root
app.get('/', (req, res) => {
  res.send('Alumni Connect API is running');
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = app;
