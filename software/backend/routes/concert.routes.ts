import { Location } from "../models/locations/location.model";
import { Concert } from "../models/acts/concert.model";
import { Request, Response, Router } from "express";
import { City } from "../models/locations/city.model";
import { SeatGroup } from "../models/locations/seatGroup.model";
import { SeatRow } from "../models/locations/seatRow.model";
import { Seat } from "../models/locations/seat.model";
import { Ticket } from "../models/ordering/ticket.model";
import { Band } from "../models/acts/band.model";

export const concert = Router()


concert.get("/", (req: Request, res: Response) => {
  Concert.findAll({
    include: [ Band, Location ],
    order: [
      [ 'date', 'ASC' ]
    ]
  })
    .then(concerts => {
      res.status(200).json(concerts)
    })
})


concert.get("/concert/:id", (req: Request, res: Response) => {
  Concert.findByPk(req.params.id, {
    include: [
      {
        model: Band,
      },
      {
        model: Location,
        include: [
          {
            model: City
          },
          {
            model: SeatGroup,
            include: [
              {
                model: SeatRow,
                include: [
                  {
                    model: Seat,
                    include: [
                      {
                        model: Ticket
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        attributes: {
          exclude: [ "cityId" ]
        }
      }
    ],
    attributes: {
      exclude: [ "locationId", "tourId" ]
    }
  })
    .then(concert => {
      for (let seatGroup of concert.dataValues.location.dataValues.seatGroups) {
        seatGroup.dataValues["occupied"] = 0

        for (let seatRow of seatGroup.dataValues.seatRows) {
          for (let seat of seatRow.dataValues.seats) {
            seat.dataValues["state"] = 0

            for (let ticket of seat.dataValues.tickets) {
              if (ticket.dataValues.concertId == req.params.id) {
                seat.dataValues["state"] = 1
                seatGroup.dataValues["occupied"] += 1
                break
              }
            }

            delete seat.dataValues.tickets
          }
        }
      }

      res.status(200).json(concert)
    })
})
