import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dotenv';

const generateToken = (id: number) => {
  return jwt.sign({ id }, JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export default generateToken;
