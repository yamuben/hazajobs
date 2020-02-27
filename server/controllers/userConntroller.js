
import lodash from 'lodash';
import dotenv from 'dotenv';
import { encryptPassword, decryptPassword } from '../helpers/securedPassword';
import User from '../models/userModels';

import response from '../helpers/responses';

import { generateAuthToken, userIdFromToken } from '../helpers/tokens';


dotenv.config();

const createuser = async (req, res) => {
  try {
    let {
      userType,
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    } = req.body;
    password = encryptPassword(password);
    const newUser = await User.create({
      userType,
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });
    const token = generateAuthToken(
      newUser._id,
      newUser.phoneNumber,
      newUser.email,
    );
    const data = {
      token,
      userData: lodash.pick(
        newUser,
        'id',
        'userType',
        'firstName',
        'lastName',
        'email',
      ),
    };
    return response.successResponse(
      res,

      201,

      'User created successfully',
      data,
    );
  } catch (error) {
    return response.errorResponse(res, 400, error);
  }
};

const signinuser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userLogin = await User.findOne({ $or: [{ email: username }, { phoneNumber: username }] });
    if (userLogin && decryptPassword(password, userLogin.password)) {
      const token = generateAuthToken(
        userLogin._id,
        userLogin.phoneNumber,
        userLogin.email,
      );
      const data = {
        token,
        userData: lodash.pick(
          userLogin,
          'id',
          'userType',
          'firstName',
          'lastName',
          'email',
        ),
      };

      return response.successResponse(
        res,

        200,

        'User logged in successfully',

        data,
      );
    }
    return response.errorResponse(res, 401, 'Incorrect email or password');
  } catch (error) {
    return response.errorResponse(res, 500, error);
  }
};


const updateUserProfile = async (req, res) => {
  const userId = userIdFromToken(req.header('x-auth-token'));
  try {
    // console(userId._id)
    const profile = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    return response.successResponse(
      res,

      200,

      'User profile updated successfully',
      profile,
    );
  } catch (error) {
    return response.errorResponse(res, 400, error);
  }
};
export default { createuser, signinuser, updateUserProfile };
