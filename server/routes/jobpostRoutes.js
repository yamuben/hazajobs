
import express from 'express';
import jobpostController from '../controllers/jobpostController';
import { verifyAuth } from '../middlewares/authVerification';

const jobpostrouter = express.Router();

jobpostrouter.post('/newjobpost', verifyAuth, jobpostController.createnewjob);
jobpostrouter.get('/jobs', jobpostController.findALLjobs);
jobpostrouter.get('/matchingJobs', verifyAuth, jobpostController.matchingJobs);
jobpostrouter.delete('/matchingJobs/:jobId', verifyAuth, jobpostController.deleteJob);
jobpostrouter.get('/jobs/:searchParameter', jobpostController.searchInJobs);
export default jobpostrouter;
