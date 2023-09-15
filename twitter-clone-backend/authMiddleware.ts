import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define a custom interface to match your JWT payload structure
interface AuthenticatedUser extends JwtPayload {
  userId: string; // Add any other properties you have in your JWT payload
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthenticatedUser;

    // Store the userId in a custom property
    req['authUserId'] = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
