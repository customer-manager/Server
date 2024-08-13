"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const database_1 = __importDefault(require("../database/firebase/database"));
class CustomerService {
    constructor() {
        this.customersCollection = database_1.default.collection('customers');
    }
    async create(customer) {
        const docRef = await this.customersCollection.add(customer);
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() };
    }
    async findAll() {
        const snapshot = await this.customersCollection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async findById(id) {
        const doc = await this.customersCollection.doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }
    async search(name) {
        const snapshot = await this.customersCollection
            .where('customer_name', '>=', name)
            .where('customer_name', '<=', name + '\uf8ff')
            .get();
        let customers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return customers;
    }
    async update(id, customer) {
        await this.customersCollection.doc(id).update(customer);
        return this.findById(id);
    }
    async delete(id) {
        await this.customersCollection.doc(id).delete();
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map