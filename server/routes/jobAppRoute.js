import express from 'express';
import { verifyAuth } from '../middlewares/authVerification';
import jobPostAppController from '../controllers/jobPostAppController';

const jobPostAppRouter = express.Router();
jobPostAppRouter.post('/jobApplication/:jobId', verifyAuth, jobPostAppController.createJobApplication);
jobPostAppRouter.get('/myJobApplications/', verifyAuth, jobPostAppController.myJobApplications);
jobPostAppRouter.get('/myCompanyApplication/', verifyAuth, jobPostAppController.myJobApplications);
jobPostAppRouter.get('/JobApplications/:jobAppId/accept', verifyAuth, jobPostAppController.accecptAplication);
jobPostAppRouter.get('/JobApplications/:jobAppId/reject', verifyAuth, jobPostAppController.rejectApplication);
export default jobPostAppRouter;
