import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.create.bind(userController));
userRouter.get('/', userController.findAll.bind(userController));
userRouter.get('/:id', userController.findById.bind(userController));
userRouter.put('/:id', userController.update.bind(userController));
userRouter.delete('/:id', userController.delete.bind(userController));

export default userRouter;
