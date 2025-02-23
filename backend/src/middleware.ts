// middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  
  try {
    const decoded = jwt.verify(authHeader, JWT_SECRET) 
    // @ts-ignore
    req.userId = decoded.userId; // Attach userId to the request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
