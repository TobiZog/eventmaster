import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization")

  if(!token) {
    return res.status(401).json({
      error: "Access denied"
    })
  }

  try {
    const decoded = jwt.verify(token, 'sjcucjdkdf')
    req["id"] = decoded["userId"]
    next()
  } catch(error) {
    res.status(401).json({
      error: "Invalid token"
    })
  }
}