import mongoose from 'mongoose';

const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('Database connected!');
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
