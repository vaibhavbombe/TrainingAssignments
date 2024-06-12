import express from 'express';
import authenticateJWT from '../middleware/authenticateJWT';
import { registerUser, loginUser, getCurrentUser } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users/me', authenticateJWT, getCurrentUser);

export default router;
