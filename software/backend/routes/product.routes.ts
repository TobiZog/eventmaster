import { Router, Request, Response, NextFunction } from "express";
import { Product } from "../models/product.model";
import { Category } from "../models/category.model";
import { Brand } from "../models/brand.model";

export const product = Router()

// Get all products
product.get("/", (req: Request, res: Response) => {
  Product.findAll({
    include: [ Category, Brand ],
    attributes: {
      exclude: [
        "categoryId",
        "brandId"
      ]
    }
  })
    .then(products => {
      res.status(200).json(products)
    })
})

// Get a product by id
product.get("/:productId", (req: Request, res: Response) => {
  Product.findByPk(
    req.params.productId,
    {
      include: [ Category, Brand ],
      attributes: {
        exclude: [
          "categoryId",
          "brandId"
        ]
      }
    }
  )
    .then(product => {
      res.status(200).json(product).send()
    })
})

// Add a new product
product.post("/", (req: Request, res: Response) => {
  Product.create(req.body)
    .then(product => {
      res.status(201).json(product).send()
    })
    .catch(error => {
      res.status(400).json({
        code: 400,
        message: error
      }).send()
    })
})

// Remove a product
product.delete("/:id", (req: Request, res: Response) => {
  Product.destroy({ 
    where: { id: req.params.id }
  })
    .then(product => {
      res.status(200).json(product).send()
    })
    .catch(error => {
      res.status(400).json({
        code: 400,
        message: error
      }).send()
    })
})