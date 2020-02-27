import express from 'express';
import userController from '../controllers/userConntroller';
import { verifyAuth } from '../middlewares/authVerification';

const userrouter = express.Router();

userrouter.post('/signup', userController.createuser);
userrouter.post('/signin', userController.signinuser);
userrouter.patch('/updateProfile', verifyAuth, userController.updateUserProfile);


export default userrouter;
