import mongoose from 'mongoose';

const connectDB = async (url: string) => {
  await mongoose.connect(url);
  console.log('Database connected');
};

export default connectDB;
