
import express from 'express';
import jobPostController from '../controllers/jobpostController';
import { verifyAuth } from '../middlewares/authVerification';

const jobPostRouter = express.Router();

jobPostRouter.post('/newjobPost', verifyAuth, jobPostController.createnewjob);
jobPostRouter.get('/jobs', jobPostController.findALLjobs);
jobPostRouter.get('/matchingJobs', verifyAuth, jobPostController.matchingJobs);
jobPostRouter.delete('/matchingJobs/:jobId', verifyAuth, jobPostController.deleteJob);
jobPostRouter.get('/jobs/:searchParameter', jobPostController.searchInJobs);
jobPostRouter.get('/home/myJobPosted', verifyAuth, jobPostController.searchYourJobPost);
export default jobPostRouter;
