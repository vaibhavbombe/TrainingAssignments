import { Router } from 'express';
import { startShift, endShift } from '../controllers/shiftController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post('/start', authenticateJWT, startShift);
router.post('/end', authenticateJWT, endShift);

export default router;
