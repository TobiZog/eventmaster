import { Router, Request, Response, NextFunction } from "express";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { OrderItem } from "../models/orderItem.model";

export const order = Router()

order.get("/", (req: Request, res: Response, next: NextFunction) => {
  Order.findAll({
    where: { accountId: req.query.accountId },
    include: [
      { model: OrderItem, include: [ Product ] }
    ]
  })
    .then(orders => {
      res.send(orders)
    })
})