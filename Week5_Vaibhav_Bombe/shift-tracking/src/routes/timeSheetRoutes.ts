import { Router } from 'express';
import { createTimesheet } from '../controllers/timesheetController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateJWT, createTimesheet);

export default router;
