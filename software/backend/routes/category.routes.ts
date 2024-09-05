import { Router, Request, Response, NextFunction } from "express";
import { Category } from "../models/category.model";

export const category = Router()

category.get("/", (req: Request, res: Response, next: NextFunction) => {
  Category.findAll()
    .then(categories => {
      res.json(categories)
    })
    .catch(next)
})

category.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body)
    const category = Category.create(req.body)
    res.status(201).json(category)
  } catch (e) {
    next(e)
  }
})