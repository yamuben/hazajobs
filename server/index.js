import express from 'express';
import bodyParse from 'body-parser';
import dotenv from 'dotenv';
import Config from './config/default';
import jobpostRoute from './routes/jobpostRoutes';
import userRoutes from './routes/userRoutes';

const mongoose = require('mongoose');

const app = express();

dotenv.config({ path: './.env' });

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// database connection codes
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Connection succesfully'));

// project routes or path
app.use(bodyParse.json());
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1', jobpostRoute);

// project server
const { port } = Config;
app.listen(port, () => process.stdout.write(`Listening on port ${port}...\n********************\n`));
export default app;
