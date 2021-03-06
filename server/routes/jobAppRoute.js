import express from 'express';
import { verifyAuth } from '../middlewares/authVerification';
import { createFeedback } from '../controllers/feebackController';
import jobPostAppController from '../controllers/jobPostAppController';

const jobPostAppRouter = express.Router();
jobPostAppRouter.post('/jobApplication/:jobId', verifyAuth, jobPostAppController.createJobApplication);
jobPostAppRouter.get('/myJobApplications/', verifyAuth, jobPostAppController.myJobApplications);
jobPostAppRouter.get('/myCompanyApplication/', verifyAuth, jobPostAppController.myJobApplications);
jobPostAppRouter.patch('/JobApplications/:jobAppId/accept', verifyAuth, jobPostAppController.accecptAplication);
jobPostAppRouter.patch('/JobApplications/:jobAppId/reject', verifyAuth, jobPostAppController.rejectApplication);
jobPostAppRouter.post('/JobApplications/:jobApplicationId/fedback', verifyAuth, createFeedback);
export default jobPostAppRouter;
