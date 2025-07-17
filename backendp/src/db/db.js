import dotenv from 'dotenv/config';
import mongoose from 'mongoose';
import { DB_NAME } from '../contants.js';
import asyncHandler from '../utils/AsyncHandler.js';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME} `
    );
    console.log(
      'MongoDB connected to host',
      connectionInstance.connection.host
    );
  } catch (error) {
    // console.log(10000, process.env.MONGO_URI);
    console.error('MongoDB connection error:', error);
    throw error;
  }
};
// const connect = () => mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

// const connectDB = asyncHandler(connect);

export default connectDB;
