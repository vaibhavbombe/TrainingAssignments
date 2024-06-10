import express from 'express';
import { createClient, getClients } from '../controllers/clientController';

const router = express.Router();

router.post('/', createClient);
router.get('/', getClients);

export default router;
import express from 'express';
import { createClient, getClients } from '../controllers/clientController';

const router = express.Router();

router.post('/', createClient);
router.get('/', getClients);

export default router;
