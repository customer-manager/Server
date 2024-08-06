"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const customer_service_1 = require("../services/customer.service");
const customerService = new customer_service_1.CustomerService();
class CustomerController {
    async create(req, res) {
        const customer = await customerService.create(req.body);
        res.status(201).json(customer);
    }
    async findAll(req, res) {
        const customers = await customerService.findAll();
        res.status(200).json(customers);
    }
    async findById(req, res) {
        const customer = await customerService.findById(req.params.id);
        if (customer) {
            res.status(200).json(customer);
        }
        else {
            res.status(404).send('User not found');
        }
    }
    async update(req, res) {
        const customer = await customerService.update(req.params.id, req.body);
        if (customer) {
            res.status(200).json(customer);
        }
        else {
            res.status(404).send('User not found');
        }
    }
    async delete(req, res) {
        await customerService.delete(req.params.id);
        res.status(204).send();
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map