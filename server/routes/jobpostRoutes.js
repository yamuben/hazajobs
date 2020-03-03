
import express from 'express';
import jobPostController from '../controllers/jobpostController';
import { verifyAuth } from '../middlewares/authVerification';

const jobPostrouter = express.Router();

jobPostrouter.post('/newjobPost', verifyAuth, jobPostController.createnewjob);
jobPostrouter.get('/jobs', jobPostController.findALLjobs);
jobPostrouter.get('/matchingJobs', verifyAuth, jobPostController.matchingJobs);
jobPostrouter.delete('/matchingJobs/:jobId', verifyAuth, jobPostController.deleteJob);
jobPostrouter.get('/jobs/:searchParameter', jobPostController.searchInJobs);
jobPostrouter.get('/home/myJobPosted', verifyAuth, jobPostController.searchYourJobPost);
export default jobPostrouter;
