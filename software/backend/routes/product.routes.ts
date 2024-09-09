import { Router, Request, Response, NextFunction } from "express";
import { Product } from "../models/product.model";

export const product = Router()

product.get("/", (req: Request, res: Response, next: NextFunction) => {
  Product.findAll()
    .then(products => {
      res.json(products)
    })
    .catch(next)
})

product.get("/:productId", (req: Request, res: Response, next: NextFunction) => {
  Product.findByPk(req.params.productId)
    .then(product => {
      res.json(product)
    })
})