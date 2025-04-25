import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../domain";

// Extendemos la request localmente con la propiedad user
interface AuthRequest extends Request {
  user?: User;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
    console.log('Token Decoded:', decoded); // Muestra el contenido del token

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token Error:', error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export type { AuthRequest };
