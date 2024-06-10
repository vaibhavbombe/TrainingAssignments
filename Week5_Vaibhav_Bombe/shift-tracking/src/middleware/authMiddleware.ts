import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Employee } from '../models/employee';

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    const employee = await Employee.findByPk(decoded.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    req.user = employee;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
