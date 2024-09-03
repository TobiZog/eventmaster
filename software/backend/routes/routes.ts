import express, { Request, Response, NextFunction } from 'express'

export const routes = app => {
  var router = express.Router()

  router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World from the backend!")
  })

  app.use("/api/", router)
}