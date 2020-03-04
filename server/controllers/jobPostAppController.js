import jobApp from '../models/jobAppModel';
import jobPost from '../models/jobPostModel';
import response from '../helpers/responses';
import { userIdFromToken } from '../helpers/tokens';

const createJobApplication = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('x-auth-token'));
    const { jobId } = req.params;
    const { proposal } = req.body;
    const jobAppDate = Date.now();
    const job = await jobPost.findById(jobId);
    if (job) {
      const jobTitle = job.title;
      const jobOwnerId = job.jobuserid;
      const jobOwner = job.organization;
      const jobApplication = await jobApp.create({
        jobId,
        userId,
        jobOwnerId,
        jobOwner,
        jobTitle,
        jobAppDate,
        proposal,
      });
      return response.successResponse(res, 201, 'job posted successfully', jobApplication);
    }
    return response.errorResponse(res, 404, 'JobPost desiered is not found');
  } catch (error) {
    return response.errorResponse(res, 400, error);
  }
};
const myJobApplications = async (req, res) => {
  try {
    const userData = userIdFromToken(req.header('x-auth-token'));
    const jobApplications = await jobApp.find({ userId: userData });
    if (jobApplications.length) {
      const sortedJobsApplications = jobApplications.sort((a, b) => (new Date(b.jobAppDate))
        .getTime() - (new Date(a.jobAppDate).getTime()));
      return response.successResponse(res, 200, 'your applications are available', sortedJobsApplications);
    }
    return response.errorResponse(res, 404, 'your applications are not available');
  } catch (error) {
    return response.errorResponse(res, 500, error);
  }
};
const accecptAplication = async (req, res) => {
  try {
    const { jobAppId } = req.params;
    const userData = userIdFromToken(req.header('x-auth-token'));
    const jobAppPost = await jobApp.findById(jobAppId);
    if (jobAppPost && jobAppPost.jobOwnerId === userData) {
      const acceptedJobApp = await jobApp.updateOne({ _id: jobAppId }, { $set: { status: 'accepted' } }, {
        new: true,
        runValidators: true,
      });
      return response.successResponse(res, 200, 'Application is accepted', acceptedJobApp);
    }
    return response.errorResponse(res, 404, 'Tha job application is not found');
  } catch (error) {
    return response.errorResponse(res, 500, error);
  }
};
const rejectApplication = async (req, res) => {
  try {
    const { jobAppId } = req.params;
    const userData = userIdFromToken(req.header('x-auth-token'));
    const jobAppPost = await jobApp.findById(jobAppId);
    if (jobAppPost && jobAppPost.jobOwnerId === userData) {
      const acceptedJobApp = await jobApp.updateOne({ _id: jobAppId }, { $set: { status: 'rejected' } }, {
        new: true,
        runValidators: true,
      });
      return response.successResponse(res, 200, 'Application is rejected', acceptedJobApp);
    }
    return response.errorResponse(res, 404, 'Tha job application is not found');
  } catch (error) {
    return response.errorResponse(res, 500, error);
  }
};
export default {
  createJobApplication, myJobApplications, accecptAplication, rejectApplication,
};
