import { Router } from 'express';
import { generateReport } from '../controllers/reportingController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/report', authenticateJWT, generateReport);

export default router;
