import express from 'express';
import bodyParse from 'body-parser';
import dotenv from 'dotenv';
import Config from './config/default';
import jobPostRoute from './routes/jobpostRoutes';
import userRoutes from './routes/userRoutes';
import jobPostAppRouter from './routes/jobAppRoute';

const mongoose = require('mongoose');

const app = express();

dotenv.config({ path: './.env' });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => process.stdout.write('DB Connection succesfully'));
app.use(bodyParse.json());
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1', jobPostRoute);
app.use('/api/v1', jobPostAppRouter);

const { port } = Config;
app.listen(port, () => process.stdout.write(`Listening on port ${port} ...\n******************** \n`));
export default app;
