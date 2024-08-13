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
    async search(req, res) {
        try {
            const { name } = req.params;
            if (typeof name === 'string') {
                const customers = await customerService.search(name);
                res.status(200).json(customers);
            }
            else {
                res.status(400).send('Invalid query parameter');
            }
        }
        catch (error) {
            res.status(500).send('Internal server error');
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