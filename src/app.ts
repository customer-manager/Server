import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { initializePassport } from './comman/strategy/jwt-strategy';
import { initializeLocalPassport } from './comman/strategy/local-strategy';
import authRouter from './routes/auth.router';
import { AuthService } from './services/auth.service';
import { authenticateToken } from './comman/middlewares/auth.middleware';

const app = express();
const port = 3000;

// Initialize AuthService
const authService = new AuthService();

// Initialize Passport
initializePassport(authService);
initializeLocalPassport(authService);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use("/auth", authRouter);

app.get('/', authenticateToken,(req, res) => {
  res.send('Hello NOD Readers!');
});

// Start Server
app.listen(port, () => {
  console.log(`Express server is listening at http://localhost:${port} 🚀`);
});
