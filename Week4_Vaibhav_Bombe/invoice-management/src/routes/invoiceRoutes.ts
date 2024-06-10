import express from 'express';
import { generateInvoice, getInvoices } from '../controllers/invoiceController';
import { generateInvoiceForSOW } from '../controllers/invoiceController';

const router = express.Router();

router.post('/invoices/generate', generateInvoice);
router.get('/invoices', getInvoices);
router.post('/generateInvoiceForSOW', generateInvoiceForSOW);

export default router;
