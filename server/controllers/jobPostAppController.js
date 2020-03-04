import jobApp from '../models/jobAppModel';
import response from '../helpers/responses';
import { userIdFromToken } from '../helpers/tokens';

const createJobApplication = async (req, res) => {
  try {
    const userId = userIdFromToken(req.header('x-auth-token'));
    const { jobId } = req.params;
    const { proposal } = req.body;
    const jobAppDate = Date.now();
    const jobApplication = await jobApp.create({
      jobId,
      userId,
      jobAppDate,
      proposal,
    });
    return response.successResponse(res, 201, 'job posted successfully', jobApplication);
  } catch (error) {
    return response.errorResponse(res, 400, error);
  }
};
export default { createJobApplication };