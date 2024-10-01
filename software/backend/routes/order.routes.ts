import { Router, Request, Response } from "express";
import { Order } from "../models/ordering/order.model";
import { Concert } from "../models/acts/concert.model";
import { OrderItem } from "../models/ordering/orderItem.model";
import { Payment } from "../models/user/payment.model";
import { Address } from "../models/user/address.model";
import { Band } from "../models/acts/band.model";
import { Location } from "../models/locations/location.model";

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
            model: Concert,
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

        Concert.decrement(
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