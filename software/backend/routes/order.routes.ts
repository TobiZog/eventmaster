import { Router, Request, Response } from "express";
import { Order } from "../models/order.model";
import { Show } from "../models/show.model";
import { OrderItem } from "../models/orderItem.model";
import { Payment } from "../models/payment.model";
import { Address } from "../models/address.model";
import { Band } from "../models/band.model";
import { Location } from "../models/location.model";

export const order = Router()

// Get all orders of one account by it's user id
order.get("/:id", (req: Request, res: Response) => {
  Order.findAll({
    where: { accountId: req.params.id },
    include: [
      { 
        model: OrderItem, 
        include: [ 
          { 
            model: Show,
            include: [ Band, Location ],
            attributes: {
              exclude: [
                "categoryId",
                "brandId"
              ]
            }
          },
        ]
      },
      Payment,
      Address
    ]
  })
    .then(orders => {
      res.status(200).json(orders)
    })
})

// Place a new order
order.post("/", (req: Request, res: Response) => {
  Order.create(req.body)
    .then(async order => {
      for (let orderItem of req.body.orderItems) {
        OrderItem.create({
          orderId: order.id,
          quantity: orderItem.quantity,
          orderPrice: orderItem.orderPrice,
          productId: orderItem.productId
        })

        Show.decrement(
          "inStock", 
          {
            by: orderItem.quantity,
            where: { id: orderItem.productId } 
          }
        )
      }

      // Created
      res.status(201).json(order)
    })
})