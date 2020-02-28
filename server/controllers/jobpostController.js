
import jobpost from '../models/jobpostModel';
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
    return response.successResponse(
      res,

      201,

      'job posted successfully',
      newJobPost,
    );
  } catch (error) {
    return response.errorResponse(res, 400, error);
  }
};

export default { createnewjob };
