"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const userService = new user_service_1.UserService();
class UserController {
    async create(req, res) {
        const user = await userService.create(req.body);
        res.status(201).json(user);
    }
    async findAll(req, res) {
        const users = await userService.findAll();
        res.status(200).json(users);
    }
    async findById(req, res) {
        const user = await userService.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).send('User not found');
        }
    }
    async update(req, res) {
        const user = await userService.update(req.params.id, req.body);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).send('User not found');
        }
    }
    async delete(req, res) {
        await userService.delete(req.params.id);
        res.status(204).send();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map