import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { initializePassport } from './comman/strategy/jwt-strategy';
import { initializeLocalPassport } from './comman/strategy/local-strategy';
import authRouter from './routes/auth.router';
import { AuthService } from './services/auth.service';
import { authenticateToken } from './comman/middlewares/auth.middleware';
import cors from 'cors';
import customerRouter from './routes/customer.router';

const app = express();
const port = 5000;

// Initialize AuthService
const authService = new AuthService();

// Initialize Passport
initializePassport(authService);
initializeLocalPassport(authService);

// CORS configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};


app.use(cors(corsOptions)); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/customer",customerRouter);

app.get('/', authenticateToken, (req, res) => {
  res.send('Hello NOD Readers!');
});

// Start Server
app.listen(port, () => {
  console.log(`Express server is listening at http://localhost:${port} 🚀`);
});
