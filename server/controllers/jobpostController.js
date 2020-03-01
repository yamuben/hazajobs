
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
    const sortedJobs = jobs.sort((a, b) => (new Date(b.jobcreatedat)).getTime()
      - (new Date(a.jobcreatedat).getTime()));
    return response.successResponse(res, 201, 'jobs retrieved successfully', sortedJobs);
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

        $or: [ { jobqualification: user.skills }, {
          joblocation: user.location,
        } ],
      });
      return response.successResponse(res, 200, 'Jobs matching your data', userJobs);
    }
    return response.errorResponse(res, 404, 'Jobs matches with your data are not available');
  } catch (error) {
    return response.errorResponse(res, 404, error);
  }
};

export default { createnewjob, findALLjobs, matchingJobs };
