import express from 'express';
import { createSOW, getSOWs, getSOWById } from '../controllers/sowController';

const router = express.Router();

router.post('/sows', createSOW);
router.get('/sows', getSOWs);
router.get('/sows/:id', getSOWById);

export default router;
