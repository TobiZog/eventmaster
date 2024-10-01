import { Concert } from "../models/acts/concert.model";
import { City } from "../models/locations/city.model";
import { Location } from "../models/locations/location.model";
import { Request, Response, Router } from "express";
import { Tour } from "../models/acts/tour.model";
import { Band } from "../models/acts/band.model";
import { SeatGroup } from "../models/locations/seatGroup.model";
import { Seat } from "../models/locations/seat.model";
import { SeatRow } from "../models/locations/seatRow.model";

export const location = Router()

location.get("/", (req: Request, res: Response) => {
  Location.findAll({
    include: [
      City, 
      {
        model: Concert,
        include: [ Tour ],
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
          let tour = concert.dataValues.tour

          await Band.findByPk(tour.dataValues.bandId)
            .then(band => {
              tour.dataValues.bandName = band.dataValues.name
              delete tour.dataValues.bandId
            })
        }
      }

      res.status(200).json(locations)
    })
})