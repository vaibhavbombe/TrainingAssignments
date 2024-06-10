import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import express from 'express';
import authRoutes from './routes/authRoutes';
import shiftRoutes from './routes/shiftRoutes';
import timesheetRoutes from './routes/timesheetRoutes';
import reportingRoutes from './routes/reportingRoutes';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/shift', shiftRoutes);
app.use('/timesheet', timesheetRoutes);
app.use('/reporting', reportingRoutes);

export default app;
