import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response): Promise<void> {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const users = await userService.findAll();
    res.status(200).json(users);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const user = await userService.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const user = await userService.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    await userService.delete(req.params.id);
    res.status(204).send();
  }
}
