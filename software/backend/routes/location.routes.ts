import { Concert } from "../models/acts/concert.model";
import { City } from "../models/locations/city.model";
import { Location } from "../models/locations/location.model";
import { Request, Response, Router } from "express";
import { Band } from "../models/acts/band.model";
import { SeatGroup } from "../models/locations/seatGroup.model";
import { Seat } from "../models/locations/seat.model";
import { SeatRow } from "../models/locations/seatRow.model";
import { Op } from "sequelize";

export const location = Router()

location.get("/", (req: Request, res: Response) => {
  let sort = req.query.sort
  let count = req.query.count

  Location.findAll({
    include: [
      City, 
      {
        model: Concert,
        include: [ Band ],
      }
    ],
    attributes: {
      exclude: [ "cityId" ]
    }
  })
    .then(async locations => {
      // Sort ascending/descending by number of concerts
      if (sort != undefined) {
        locations.sort((location1, location2) => {
          if (sort == "desc") {
            return location2.dataValues.concerts.length - location1.dataValues.concerts.length
          } else if (sort == "asc") {
            return location1.dataValues.concerts.length - location2.dataValues.concerts.length
          }
        })
      }

      for (let location of locations) {
        location.dataValues["nrOfConcerts"] = location.dataValues.concerts.length
        delete location.dataValues.concerts
      }

      // Limit number of items
      if (count != undefined) {
        locations.splice(Number(count))
      }

      res.status(200).json(locations)
    })
})

location.get("/location/:urlName", (req: Request, res: Response) => {
  Location.findOne({
    where: { urlName: req.params.urlName },
    include: [
      City, 
      {
        model: Concert,
        include: [ Band ],
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
      for (let seatGroup of location.dataValues.seatGroups) {
        for (let seatRow of seatGroup.dataValues.seatRows) {
          for (let seat of seatRow.dataValues.seats) {
            seat.dataValues["state"] = 0
          }
        }
      }

      res.status(200).json(location)
    })
})


// Location search
location.get("/search", (req: Request, res: Response) => {
  Location.findAll({
    where: {
      name: {
        [Op.substring]: req.query.value
      }
    },
    include: [ Concert ]
  })
    .then(locations => {
      res.status(200).json(locations)
    })
})