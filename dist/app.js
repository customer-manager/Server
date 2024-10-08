"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const jwt_strategy_1 = require("./comman/strategy/jwt-strategy");
const local_strategy_1 = require("./comman/strategy/local-strategy");
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const auth_service_1 = require("./services/auth.service");
const auth_middleware_1 = require("./comman/middlewares/auth.middleware");
const cors_1 = __importDefault(require("cors"));
const customer_router_1 = __importDefault(require("./routes/customer.router"));
const app = (0, express_1.default)();
const port = 5000;
// Initialize AuthService
const authService = new auth_service_1.AuthService();
// Initialize Passport
(0, jwt_strategy_1.initializePassport)(authService);
(0, local_strategy_1.initializeLocalPassport)(authService);
// CORS configuration
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use((0, cors_1.default)(corsOptions)); // Apply CORS middleware
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Initialize Passport
app.use(passport_1.default.initialize());
// Routes
app.use("/api/v1/auth", auth_router_1.default);
app.use("/customer", customer_router_1.default);
app.get('/', auth_middleware_1.authenticateToken, (req, res) => {
    res.send('Hello NOD Readers!');
});
// Start Server
app.listen(port, () => {
    console.log(`Express server is listening at http://localhost:${port} 🚀`);
});
//# sourceMappingURL=app.js.map