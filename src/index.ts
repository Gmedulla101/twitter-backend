import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//IMPORTING ERRORS
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';

//IMPORTING HELPER FUNCTIONS
import connectDB from './connectDB/connectDB';

//IMPORTING ROUTES
import authRouter from './routes/auth-route';
import postRouter from './routes/post-route';

//INITALISING APP
const app = express();
dotenv.config();

//UTILISING MIDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('No database connection string');
  }
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
};

start();
