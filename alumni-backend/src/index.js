const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config');
// Load environment variables from .env file
require('dotenv').config();
// Connect to database
connectDB();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

const PORT = process.env.PORT ;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});