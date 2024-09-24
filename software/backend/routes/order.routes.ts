import { Router, Request, Response } from "express";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { OrderItem } from "../models/orderItem.model";
import { Brand } from "../models/brand.model";
import { Category } from "../models/category.model";
import { Sequelize } from "sequelize-typescript";

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
            model: Product,
            include: [ Brand, Category ],
            attributes: {
              exclude: [
                "categoryId",
                "brandId"
              ]
            }
          },
        ]
      }
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

        Product.decrement(
          "inStock", 
          { where: { id: orderItem.productId } }
        )
      }

      // Created
      res.status(201).json(order)
    })
})