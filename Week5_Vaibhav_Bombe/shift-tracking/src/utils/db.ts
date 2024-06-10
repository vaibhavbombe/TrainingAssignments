import { Sequelize } from 'sequelize-typescript';
import { Employee } from '../models/employee';
import { Shift } from '../models/shift';
import { Timesheet } from '../models/timesheet';
import { Claim } from '../models/claims';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  models: [Employee, Shift, Timesheet, Claim]
});

export default sequelize;
