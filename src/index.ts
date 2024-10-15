import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//IMPORTING MIDDLEWARE
import connectDb from './db/connect';
import notFound from './middleware/notFound';
import errorHandler from './middleware/error-handler';
import authRouter from './routes/auth-route';

//INTIALISING
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//USING CUSTOM MIDDLEWARE
app.use(cors());

//SETTING UP ROUTES
app.use('/api/v1/auth', authRouter);

//UTILISING ERROR MIDDLEWARE
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDb(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
};

start();
