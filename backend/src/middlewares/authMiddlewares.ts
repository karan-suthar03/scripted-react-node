import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token required' });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({ message: 'JWT_SECRET not configured' });
    return;
  }

  jwt.verify(token, jwtSecret, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
      return;
    }
    req.user = user;
    next();
  });
};
