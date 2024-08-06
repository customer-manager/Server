"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = __importDefault(require("../database/firebase/database"));
class UserService {
    constructor() {
        this.usersCollection = database_1.default.collection('users');
    }
    async create(user) {
        const docRef = await this.usersCollection.add(user);
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() };
    }
    async findAll() {
        const snapshot = await this.usersCollection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async findById(id) {
        const doc = await this.usersCollection.doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }
    async update(id, user) {
        await this.usersCollection.doc(id).update(user);
        return this.findById(id);
    }
    async delete(id) {
        await this.usersCollection.doc(id).delete();
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map