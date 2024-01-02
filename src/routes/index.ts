import UserController from '../controllers/UserController';
import { Router } from 'express';

const userRoutes = Router();
const userController: UserController = new UserController();

userRoutes.post('/user/sign-up', userController.create);
userRoutes.post('/user/sign-in', userController.signIn);

export default userRoutes;
