import express from 'express';
import paymentRoutes from './routes/paymentRoutes';

const app = express();

app.use(express.json());

app.use('/api', paymentRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
