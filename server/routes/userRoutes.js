import express from 'express';
import userController from '../controllers/userConntroller';

const userrouter = express.Router();

userrouter.post('/signup', userController.createuser);
userrouter.post('/signin', userController.signinuser);


export default userrouter;
