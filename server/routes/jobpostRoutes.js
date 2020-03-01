
import express from 'express';
import jobpostController from '../controllers/jobpostController';
import { verifyAuth } from '../middlewares/authVerification';

const jobpostrouter = express.Router();

jobpostrouter.post('/newjobpost', verifyAuth, jobpostController.createnewjob);
jobpostrouter.get('/jobs', jobpostController.findALLjobs);
jobpostrouter.get('/matchingJobs', jobpostController.matchingJobs);
export default jobpostrouter;
