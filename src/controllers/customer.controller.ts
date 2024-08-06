import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';

const customerService = new CustomerService();

export class CustomerController {
  async create(req: Request, res: Response): Promise<void> {
    const customer = await customerService.create(req.body);
    res.status(201).json(customer);
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const customers = await customerService.findAll();
    res.status(200).json(customers);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const customer = await customerService.findById(req.params.id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).send('User not found');
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const customer = await customerService.update(req.params.id, req.body);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).send('User not found');
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    await customerService.delete(req.params.id);
    res.status(204).send();
  }
}
