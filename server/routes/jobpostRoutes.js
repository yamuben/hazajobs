
import express from 'express';
import jobPostController from '../controllers/jobPostController';
import { verifyAuth } from '../middlewares/authVerification';

const jobPostRouter = express.Router();

jobPostRouter.post('/newjobPost', verifyAuth, jobPostController.createnewjob);
jobPostRouter.patch('/jobs/:jobId', verifyAuth, jobPostController.editPostedJob);
jobPostRouter.get('/jobs', jobPostController.findALLjobs);
jobPostRouter.get('/matchingJobs', verifyAuth, jobPostController.matchingJobs);
jobPostRouter.delete('/matchingJobs/:jobId', verifyAuth, jobPostController.deleteJob);
jobPostRouter.get('/jobs/:searchParameter', jobPostController.searchInJobs);
jobPostRouter.get('/home/myJobPosted', verifyAuth, jobPostController.searchYourJobPost);
export default jobPostRouter;
