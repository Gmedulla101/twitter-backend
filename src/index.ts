import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './db/connect';
import notFound from './middleware/notFound';
import errorHandler from './middleware/error-handler';

//INTIALISING
dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//USING CUSTOM MIDDLEWARE
app.use(cors());

//UTILISING ERROR MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const start = async () => {
  await connectDb(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
};

start();
