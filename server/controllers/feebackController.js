import Feedback from '../models/feedbackModel';
import response from '../helpers/responses';
import jobApp from '../models/jobAppModel';
import { userIdFromToken } from '../helpers/tokens';


export const createFeedback = async (req, res) => {
  try {
    const userInfos = userIdFromToken(req.header('x-auth-token'));
    const { jobApplicationId } = req.params;
    let{
      employerId,
      jobId,
      employeeId,
      score,
      remark,
    } = req.body;
    employerId = userInfos;
    const jobApplication = await jobApp.findById(jobApplicationId);
    if (jobApplication && (jobApplication.jobOwnerId === userInfos) && (jobApplication.status === 'accepted')) {
      jobId = jobApplication.jobId;
      employeeId = jobApplication.userId;
      const employerFeedback = await Feedback.create({
        employerId,
        jobId,
        employeeId,
        score,
        remark,
      });
      return response.successResponse(res, 201, 'job feedback successfully', employerFeedback);
    }
  } catch (error) {
    return response.errorResponse(res, 400, error);
  }
};
