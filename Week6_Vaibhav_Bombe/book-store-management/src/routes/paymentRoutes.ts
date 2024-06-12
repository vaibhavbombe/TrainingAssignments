import express from 'express';
import authenticateJWT from '../middleware/authenticateJWT';
import { createPayment, getPaymentById } from '../services/paymentService';

const router = express.Router();

router.post('/orders', authenticateJWT, createPayment);
router.get('/orders/:id', authenticateJWT, getPaymentById);

export default router;
