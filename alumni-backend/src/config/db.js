const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...', process.env.NODE_ENV);
    const connectionString =  process.env.MONGODB_URI_PROD;
    
    const conn = await mongoose.connect(connectionString);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;