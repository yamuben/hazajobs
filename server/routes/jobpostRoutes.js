import express from 'express';
import jobpostController from '../controllers/jobpostController';

const jobpostrouter = express.Router();

jobpostrouter
  .post('/newjobpost', jobpostController.createnewjob);

export default jobpostrouter;
