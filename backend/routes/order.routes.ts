/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API to manage orders
 */
import { Router, Request, Response } from "express";
import { Order } from "../models/ordering/order.model";
import { Concert } from "../models/acts/concert.model";
import { Ticket } from "../models/ordering/ticket.model";
import { Payment } from "../models/user/payment.model";
import { Address } from "../models/user/address.model";
import { Band } from "../models/acts/band.model";
import { Location } from "../models/locations/location.model";
import { City } from "../models/locations/city.model";
import { Seat } from "../models/locations/seat.model";
import { SeatRow } from "../models/locations/seatRow.model";
import { SeatGroup } from "../models/locations/seatGroup.model";
import { verifyToken } from "../middlewares/auth.middleware";
import { Account } from "../models/user/account.model";

export const order = Router()

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get orders of an account or all available
 *     tags: [Orders]
 *     security:
 *        - JWT: []
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *            type: string
 *          required: false
 *          description: User account id to filter the orders
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/order'
 *       500:
 *         description: Internal server error
 */
order.get("/", verifyToken, (req: Request, res: Response) => {
  const accountId = req.query.id

  Order.findAll({
    include: [
      {
        model: Ticket,
        include: [
          {
            model: Concert,
            include: [
              {
                model: Band
              },
              {
                model: Location,
                include: [ City ]
              }
            ]
          },
          {
            model: Seat,
            include: [
              {
                model: SeatRow,
                include: [ SeatGroup ]
              }
            ]
          }
        ]
      },
      Address,
      Payment,
      Account,
    ],
    attributes: {
      exclude: [ "accountId", "addressId", "paymentId" ]
    }
  })
    .then(orders => {
      if (accountId != undefined) {
        let filteredOrders = orders.filter(order => {
          return order.id == accountId
        })

        res.status(200).json(filteredOrders)
      } else {
        res.status(200).json(orders)
      }
    })
    .catch(error => {
      res.status(500).send()
    })
})

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *        - JWT: []
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *            type: string
 *          required: false
 *          description: User account id to filter the orders
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/order'
 *       500:
 *         description: Internal server error
 */
order.post("/", verifyToken, (req: Request, res: Response) => {
  req.body["accountId"] = req["id"]

  console.log(req.body)

  Order.create(req.body)
    .then(async order => {
      for (let ticket of req.body.tickets) {
        Ticket.create({
          orderId: order.dataValues.id,
          concertId: ticket.concertId,
          orderPrice: ticket.orderPrice,
          seatId: ticket.seatId
        })

        Concert.decrement(
          "inStock", 
          {
            by: 1,
            where: { id: ticket.concertId } 
          }
        )
      }

      // Created
      res.status(201).json(order)
    })
    .catch(error => {
      res.status(500).send()
    })
})

order.patch("/", (req: Request, res: Response) => {
  Order.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(affectedCount => {
      res.status(200).send()
    })
    .catch(error => {
      res.status(500).send()
    })
})