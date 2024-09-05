import { Router, Request, Response, NextFunction } from "express";
import { OrderedItem } from "../models/orderedItem.model";

export const orderedItem = Router()

orderedItem.get("/", (req: Request, res: Response, next: NextFunction) => {
  OrderedItem.findAll()
    .then(orderedItems => {
      res.json(orderedItems)
    })
    .catch(next)
})