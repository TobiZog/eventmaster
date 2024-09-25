import { Brand } from "../models/brand.model"
import { Request, Router, Response } from "express"

export const brand = Router()

// Get all brands
brand.get("/", (req: Request, res: Response) => {
  Brand.findAll()
    .then(brands => {
      res.status(200).json(brands)
    })
})