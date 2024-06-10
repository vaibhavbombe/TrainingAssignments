import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Employee } from '../models/employee';
import { Shift } from '../models/shift';
import { v4 as uuidv4 } from 'uuid';

// Utility to generate JWT token
const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'default_secret', {
    expiresIn: '1h',
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ where: { email } });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(employee.id, employee.role);

    const newShift = await Shift.create({
      id: uuidv4(),
      employeeId: employee.id,
      startTime: new Date(),
    });

    res.status(200).json({
      token,
      shift: newShift,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
