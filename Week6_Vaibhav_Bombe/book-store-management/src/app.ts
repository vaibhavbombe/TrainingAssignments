import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';
import authorRoutes from './routes/authorRoutes';
import userRoutes from './routes/userRoutes';
import reviewRoutes from './routes/reviewRoutes';
import ratingRoutes from './routes/ratingRoutes';
import paymentRoutes from './routes/paymentRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/api', bookRoutes);
app.use('/api', authorRoutes);
app.use('/api', userRoutes);
app.use('/api', reviewRoutes);
app.use('/api', ratingRoutes);
app.use('/api', paymentRoutes);

export default app;
