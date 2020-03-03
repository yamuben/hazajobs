import express from 'express';
import userController from '../controllers/userConntroller';
import { verifyAuth } from '../middlewares/authVerification';

const userRouter = express.Router();

userRouter.post('/signup', userController.createuser);
userRouter.post('/signin', userController.signinuser);
userRouter.patch('/updateProfile', verifyAuth, userController.updateUserProfile);
userRouter.get('/viewProfile/:searchId', verifyAuth, userController.viewProfile);
userRouter.patch('/profile/changePassword', verifyAuth, userController.changePassword);
userRouter.get('/profiles/:userParameter', userController.searchUser);
export default userRouter;
