import { Concert } from "../models/acts/concert.model";
import { City } from "../models/locations/city.model";
import { Location } from "../models/locations/location.model";
import { Request, Response, Router } from "express";
import { Event } from "../models/acts/event.model";
import { Band } from "../models/acts/band.model";
import { SeatGroup } from "../models/locations/seatGroup.model";
import { Seat } from "../models/locations/seat.model";
import { SeatRow } from "../models/locations/seatRow.model";
import { Op } from "sequelize";

export const location = Router()

location.get("/", (req: Request, res: Response) => {
  Location.findAll({
    include: [
      City, 
      {
        model: Concert,
        include: [ Event ],
        attributes: {
          exclude: [ "locationId", "tourId" ]
        }
      },
      {
        model: SeatGroup,
        include: [
          {
            model: SeatRow,
            include: [ Seat ]
          }
        ]
      }
    ],
    attributes: {
      exclude: [ "cityId" ]
    }
  })
    .then(async locations => {
      for (let location of locations) {
        for (let concert of location.dataValues.concerts) {
          let event = concert.dataValues.event

          await Band.findByPk(event.dataValues.bandId)
            .then(band => {
              event.dataValues.bandName = band.dataValues.name
              delete event.dataValues.bandId
            })
        }
      }

      res.status(200).json(locations)
    })
})

location.get("/:name", (req: Request, res: Response) => {
  console.log(req.params.name)

  Location.findOne({
    where: { name: { [Op.like]: req.params.name } },
    include: [
      City, 
      {
        model: Concert,
        include: [ Event ],
        attributes: {
          exclude: [ "locationId", "tourId" ]
        }
      },
      {
        model: SeatGroup,
        include: [
          {
            model: SeatRow,
            include: [ Seat ]
          }
        ]
      }
    ],
    attributes: {
      exclude: [ "cityId" ]
    }
  })
    .then(async location => {
      for (let concert of location.dataValues.concerts) {
        let event = concert.dataValues.event

        await Band.findByPk(event.dataValues.bandId)
          .then(band => {
            event.dataValues.bandName = band.dataValues.name
            delete event.dataValues.bandId
          })
      }

      res.status(200).json(location)
    })
})