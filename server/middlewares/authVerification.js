
import User from '../models/userModels';
import { userIdFromToken } from '../helpers/tokens';
import responses from '../helpers/responses';

export const verifyAuth = async (req, res, next) => {
  const authToken = req.header('x-auth-token');
  if (!authToken) {
    return responses.errorResponse(res, 400, "You haven't provide your token");
  }
  try {
    const userId = userIdFromToken(authToken);

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return responses.errorResponse(
        res,
        401,
        'You are not authorized to perform this task',
      );
    }

    next();
  } catch (error) {
    return responses.errorResponse(res, 400, error.message);
  }
};
