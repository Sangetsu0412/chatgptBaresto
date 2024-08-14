import express, { Router } from 'express';
import { register, login, forgotPassword } from '../controllers/authController';

const router: Router = express.Router();

// Define routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

export default router;
