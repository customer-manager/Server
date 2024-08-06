"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
userRouter.post('/', userController.create.bind(userController));
userRouter.get('/', userController.findAll.bind(userController));
userRouter.get('/:id', userController.findById.bind(userController));
userRouter.put('/:id', userController.update.bind(userController));
userRouter.delete('/:id', userController.delete.bind(userController));
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map