import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'default_secret';

export const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
