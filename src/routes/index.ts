import EventController from '../event/controller/EventController';
import UserController from '../user/controllers/UserController';
import { Router } from 'express';
import { authMiddleware } from '../utils/middlewares/authMiddleware';

const userRoutes = Router();
const userController: UserController = new UserController();

userRoutes.post('/user/sign-up', userController.create);
userRoutes.post('/user/sign-in', userController.signIn);

const eventRoutes = Router();
const eventController: EventController = new EventController();

eventRoutes.post('/events', authMiddleware, eventController.create);

export { userRoutes, eventRoutes };
