import express from 'express';
import userController from '../controllers/userConntroller';
import { verifyAuth } from '../middlewares/authVerification';

const userrouter = express.Router();

userrouter.post('/signup', userController.createuser);
userrouter.post('/signin', userController.signinuser);
userrouter.patch('/updateProfile', verifyAuth, userController.updateUserProfile);
userrouter.get('/viewProfile/:searchId', verifyAuth, userController.viewProfile);
userrouter.patch('/profile/changePassword', verifyAuth, userController.changePassword);
export default userrouter;
