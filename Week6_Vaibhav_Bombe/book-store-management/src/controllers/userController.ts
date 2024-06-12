import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { hashPassword, comparePassword } from '../utils/passwordUtils';

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({ username, password: hashedPassword, email });
  res.status(201).json(newUser);
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && await comparePassword(password, user.password)) {
    const token = jwt.sign({ id: user.id, role: 'user' }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.user.id);
  res.json(user);
};
