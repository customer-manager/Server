"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = __importDefault(require("../database/firebase/database")); // Firebase bağlantı dosyanız
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthService {
    constructor() {
        this.usersCollection = database_1.default.collection('users');
    }
    async create(user) {
        const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
        const userDoc = this.usersCollection.doc();
        await userDoc.set({
            ...user,
            password: hashedPassword
        });
        const doc = await userDoc.get();
        return { id: doc.id, ...doc.data() };
    }
    async findByUsername(username) {
        const snapshot = await this.usersCollection.where('username', '==', username).get();
        if (snapshot.empty)
            return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    }
    async findById(id) {
        const doc = await this.usersCollection.doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }
    async validatePassword(user, password) {
        return await bcryptjs_1.default.compare(password, user.password);
    }
    async saveRefreshToken(userId, refreshToken) {
        const userDoc = this.usersCollection.doc(userId);
        await userDoc.update({ refreshToken });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map