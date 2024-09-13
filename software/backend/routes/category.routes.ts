import { Router, Request, Response, NextFunction } from "express";
import { Category } from "../models/category.model";

export const category = Router()

// Get all categories
category.get("/", (req: Request, res: Response, next: NextFunction) => {
  Category.findAll()
    .then(categories => {
      res.status(200).json(categories).send()
    })
    .catch(error => {
      res.status(400).json({ message: error }).send()
    })
})

// Add new category
category.post("/", (req: Request, res: Response, next: NextFunction) => {
  Category.create(req.body)
    .then(category => {
      res.status(201).send()
    })
    .catch(error => {
      res.status(400).json({ 
        message: error
      }).send()
    })
})

// Delete category
category.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  Category.destroy({
    where: { id: req.params.id }
  })
    .then(category => {
      res.status(200).send()
    })
    .catch(error => {
      res.status(406).json({
        message: error
      }).send()
    })
})