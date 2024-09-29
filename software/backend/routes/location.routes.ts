import { Concert } from "../models/acts/concert.model";
import { City } from "../models/acts/city.model";
import { Location } from "../models/acts/location.model";
import { Request, Response, Router } from "express";
import { Tour } from "../models/acts/tour.model";
import { Band } from "../models/acts/band.model";

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