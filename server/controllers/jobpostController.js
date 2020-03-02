
import jobpost from '../models/jobpostModel';
import User from '../models/userModels';
import response from '../helpers/responses';
import { userIdFromToken } from '../helpers/tokens';


const createnewjob = async (req, res) => {
  try {
    let {
      jobuserid,
      jobtitle,
      organization,
      numberofpositions,
      jobduration,
      deadline,
      salary,
      workingdays,
      joblocation,
      jobdescription,
      jobqualification,
      jobStartFrom,
    } = req.body;
    const userId = userIdFromToken(req.header('x-auth-token'));

    jobuserid = userId;
    const newJobPost = await jobpost.create({
      jobuserid,
      jobtitle,
      organization,
      numberofpositions,
      jobduration,
      deadline,
      salary,
      workingdays,
      joblocation,
      jobdescription,
      jobqualification,
      jobStartFrom,
    });
    return response.successResponse(res, 201, 'job posted successfully', newJobPost);
  } catch (error) {
    return response.errorResponse(res, 400, error);
  }
};
const findALLjobs = async (req, res) => {
  try {
    const jobs = await jobpost.find();
    if (jobs.length) {
      const sortedJobs = jobs.sort((a, b) => (new Date(b.jobcreatedat)).getTime()
        - (new Date(a.jobcreatedat).getTime()));
      return response.successResponse(res, 201, 'jobs retrieved successfully', sortedJobs);
    }
    return response.errorResponse(res, 404, 'Jobs are not available');
  } catch (error) {
    return response.errorResponse(res, 404, error);
  }
};
const matchingJobs = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('x-auth-token'));
    const user = await User.findById(userId);
    if (user) {
      const userJobs = await jobpost.find({
        $or: [ { 'jobqualification.first': user.skills.first }, { 'jobqualification.second': user.skills.second }, { 'joblocation.province': user.location.province }, { 'joblocation.district': user.location.district }, { 'joblocation.center': user.location.center } ],
      });
      if (userJobs.length) { return response.successResponse(res, 200, 'Jobs matching your data', userJobs); }
      return response.errorResponse(res, 404, 'Jobs matches with your data are not available');
    }
    return response.errorResponse(res, 401, 'You are not a user');
  } catch (error) {
    return response.errorResponse(res, 500, error);
  }
};
const deleteJob = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('x-auth-token'));
    const { jobId } = req.params;
    const job = await jobpost.findById(jobId);
    if (job && job.jobuserid === userId) {
      const deletedJob = await jobpost.deleteOne({ _id: jobId });
      return response.successResponse(res, 200, 'job successfully deleted', deletedJob);
    }
    return response.errorResponse(res, 404, 'job is not found');
  } catch (error) {
    return response.errorResponse(res, 500, error);
  }
};

const searchInJobs = async (req, res) => {
  try {
    const searchResult = await jobpost.find();
    if (searchInJobs.length) {
      return response.successResponse(res, 200, 'job successfully deleted', searchResult);
    }
    return response.errorResponse(res, 404, 'job is not found');
  } catch (error) {
    return response.errorResponse(res, 500, error);
  }
};
export default {
  createnewjob, findALLjobs, matchingJobs, deleteJob, searchInJobs,
};
