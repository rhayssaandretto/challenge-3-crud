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
eventRoutes.get('/events/:id', authMiddleware, eventController.getById);
eventRoutes.get('/events', authMiddleware, eventController.getAll);
eventRoutes.delete('/events/:id', authMiddleware, eventController.deleteById);
eventRoutes.delete('/events', authMiddleware, eventController.deleteByWeekday);

export { userRoutes, eventRoutes };
