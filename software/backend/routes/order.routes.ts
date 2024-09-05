import { Router, Request, Response, NextFunction } from "express";
import { Order } from "../models/order.model";

export const order = Router()

order.get("/", (req: Request, res: Response, next: NextFunction) => {
  Order.findAll()
    .then(orders => {
      res.json(orders)
    })
    .catch(next)
})