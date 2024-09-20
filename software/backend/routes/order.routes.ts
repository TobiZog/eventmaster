import { Router, Request, Response } from "express";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { OrderItem } from "../models/orderItem.model";

export const order = Router()

// Get all orders of one account by it's user id
order.get("/:id", (req: Request, res: Response) => {
  Order.findAll({
    where: { accountId: req.params.id },
    include: [
      { model: OrderItem, include: [ Product ] }
    ]
  })
    .then(orders => {
      res.status(200).json(orders)
    })
})

// Place a new order
order.post("/", (req: Request, res: Response) => {
  let totalPrice = 0

  Order.create(req.body)
    .then(order => {

      for (let orderItem of req.body.orderItem) {
        OrderItem.create({
          "orderId": order.id,
          "quantity": orderItem.quantity,
          "productId": orderItem.productId
        })

        Product.findOne({
          raw: true,
          where: { id: orderItem.productId }
        })
          .then(product => {
            totalPrice += product.price * orderItem.quantity

            Order.update({
              totalPrice: totalPrice
            }, {
              where: { id: order.id },
            })
          })
      }
    })

  // Created
  res.status(201).send()
})