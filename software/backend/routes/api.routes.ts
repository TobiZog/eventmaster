import { Request, Response, NextFunction, Router } from 'express'

export const api = Router()

api.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!")
})