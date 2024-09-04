import { Router, Request, Response, NextFunction } from "express";
import { Categories } from "../models/categories.model";

export const categories = Router()

categories.get("/", (req: Request, res: Response, next: NextFunction) => {
  Categories.findAll()
    .then(categories => res.json(categories))
    .catch(next)
})

categories.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body)
    const category = Categories.create(req.body)
    res.status(201).json(category)
  } catch (e) {
    next(e)
  }
})