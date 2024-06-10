import express from 'express';
import { createOrganization, getOrganizations, getOrganizationById } from '../controllers/organizationController';

const router = express.Router();

router.post('/organizations', createOrganization);
router.get('/organizations', getOrganizations);
router.get('/organizations/:id', getOrganizationById);

export default router;
