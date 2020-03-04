import express from 'express';
import { verifyAuth } from '../middlewares/authVerification';
import jobPostAppController from '../controllers/jobPostAppController';

const jobPostAppRouter = express.Router();
jobPostAppRouter.post('/jobApplication:jobId', verifyAuth, jobPostAppController.createJobApplication);
export default jobPostAppRouter;
