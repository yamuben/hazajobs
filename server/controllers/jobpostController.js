
import jobPost from '../models/jobPostModel';
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
    const newjobPost = await jobPost.create({
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
    return response.successResponse(res, 201, 'job posted successfully', newjobPost);
  } catch (error) {
    return response.errorResponse(res, 400, error);
  }
};
const editPostedJob = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('x-auth-token'));
    const { jobId } = req.params;
    const editableJob = await jobPost.findById(jobId);
    if (editableJob.jobuserid === userId) {
      const updatedJobPost = await jobPost.findByIdAndUpdate(jobId, req.body, {
        new: true,
        runValidators: true,
      });
      return response.successResponse(res, 400, 'Job edited successfully', updatedJobPost);
    }
    return response.errorResponse(res, 403, "This job post doesn't belong to you");
  } catch (err) {
    return response.errorResponse(res, 500, err);
  }
};
const findALLjobs = async (req, res) => {
  try {
    const jobs = await jobPost.find();
    if (jobs.length) {
      const sortedJobs = jobs.sort((a, b) => (new Date(b.jobcreatedat)).getTime()
        - (new Date(a.jobcreatedat).getTime()));
      return response.successResponse(res, 201, 'jobs retrieved successfully', sortedJobs);
    }
    return response.errorResponse(res, 404, 'Jobs are not available');
  } catch (error) {
    return response.errorResponse(res, 500, error);
  }
};
const matchingJobs = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('x-auth-token'));
    const user = await User.findById(userId);
    if (user) {
      const userJobs = await jobPost.find({
        $or: [ { 'jobqualification.first': user.skills.first }, { 'jobqualification.second': user.skills.second }, { 'joblocation.province': user.location.province }, { 'joblocation.district': user.location.district }, { 'joblocation.center': user.location.center } ],
      });
      if (userJobs.length) {
        const sortedUserJobs = userJobs.sort((a, b) => (new Date(b.jobcreatedat)).getTime()
          - (new Date(a.jobcreatedat).getTime()));
        return response.successResponse(res, 200, 'Jobs matching your data', sortedUserJobs);
      }
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
    const job = await jobPost.findById(jobId);
    if (job && job.jobuserid === userId) {
      const deletedJob = await jobPost.deleteOne({ _id: jobId });
      return response.successResponse(res, 200, 'job successfully deleted', deletedJob);
    }
    return response.errorResponse(res, 404, 'job is not found');
  } catch (error) {
    return response.errorResponse(res, 500, error);
  }
};

const searchInJobs = async (req, res) => {
  try {
    const { searchParameter } = req.params;
    const searchResult = await jobPost.find({
      $or: [
        { organization: { $regex: `.*${ searchParameter }.*` } },
        { 'joblocation.province': { $regex: `.*${ searchParameter }.*` } },
        { 'joblocation.district': { $regex: `.*${ searchParameter }.*` } },
        { 'joblocation.center': { $regex: `.*${ searchParameter }.*` } },
        { 'jobqualification.first': { $regex: `.*${ searchParameter }.*` } },
        { 'jobqualification.second': { $regex: `.*${ searchParameter }.*` } },
      ],
    });
    if (searchResult.length) {
      const sortedSearchedJobs = searchResult.sort((a, b) => (new Date(b.jobcreatedat)).getTime()
        - (new Date(a.jobcreatedat).getTime()));
      return response.successResponse(res, 200, 'job successfully retrieved ', sortedSearchedJobs);

    }
    return response.errorResponse(res, 404, 'job is not found');
  } catch (error) {
    return response.errorResponse(res, 500, error);
  }
};
const searchYourJobPost = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('x-auth-token'));
    const companiesPostedJob = await jobPost.find({ jobuserid: userId });
    if (companiesPostedJob.length) {
      return response.successResponse(res, 200, 'Job posted are available', companiesPostedJob);
    }
    return response.errorResponse(res, 404, 'Jobs posted are not available');
  } catch (err) {
    return response.errorResponse(res, 500, err);
  }
};
export default {
  createnewjob,
  editPostedJob,
  findALLjobs,
  matchingJobs,
  deleteJob,
  searchInJobs,
  searchYourJobPost,
};
