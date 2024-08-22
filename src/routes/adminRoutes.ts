import { Router } from 'express';
import { someAdminFunction } from '../controllers/adminController';
import authMiddleware, { adminMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Protect admin routes with both auth and admin middleware
router.get('/some-admin-route', authMiddleware, adminMiddleware, someAdminFunction);

export default router;
