import Feedback from '../models/feedbackModel';
import response from '../helpers/responses';
import jobApp from '../models/jobAppModel';
import { userIdFromToken } from '../helpers/tokens';

const createFeedback = async (req, res) => {
  try {
		const userId = userIdFromToken(req.header('x-auth-token'));
		const { jobApplicationId } = req.params;
  } catch (error) {
    return response.errorResponse(res, 400, error);
  }
};
