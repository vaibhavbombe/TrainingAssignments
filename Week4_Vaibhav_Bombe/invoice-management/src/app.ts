import express from 'express';
import clientRoutes from './routes/clientRoutes';
import sowRoutes from './routes/sowRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import paymentRoutes from './routes/paymentRoutes';

const app = express();

app.use(express.json());

app.use('/api/clients', clientRoutes);
app.use('/api/sows', sowRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/payments', paymentRoutes);

export default app;
