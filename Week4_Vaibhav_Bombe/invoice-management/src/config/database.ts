import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './dotenv';

const sequelize = new Sequelize(DATABASE_URL as string);

export default sequelize;
