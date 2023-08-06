import mongoose from 'mongoose';
import config from '../../../config';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.db_url)
    console.log('MongoDB connected!!')
  } catch (err) {
    console.log('Failed to connect to MongoDB', err)
  }
}
