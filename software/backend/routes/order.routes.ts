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

export const order = Router()

// Get all orders of one account by it's user id
order.get("/:id", (req: Request, res: Response) => {
  Order.findAll({
    where: { accountId: req.params.id },
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
            ],
            attributes: {
              exclude: [
                "categoryId",
                "brandId"
              ]
            }
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
})