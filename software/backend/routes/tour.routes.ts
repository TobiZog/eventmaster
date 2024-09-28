import { Concert } from "../models/acts/concert.model";
import { Band } from "../models/acts/band.model";
import { Tour } from "../models/acts/tour.model";
import { Request, Response, Router } from "express";
import { Location } from "../models/acts/location.model";
import { Genre } from "../models/acts/genre.model";
import { City } from "../models/acts/city.model";

export const tour = Router()

tour.get("/", (req: Request, res: Response) => {
  Tour.findAll({
    include: [
      {
        model: Band,
        include: [ Genre ],
        attributes: {
          exclude: [ "genreId" ]
        }
      },
      { 
        model: Concert, 
        include: [ 
          {
            model: Location,
            include: [ City ],
            attributes: {
              exclude: [ "cityId" ]
            }
          }
        ],
        attributes: {
          exclude: [ "locationId", "tourId" ]
        }
      },
    ],
    attributes: {
      exclude: [ "bandId" ]
    }
  })
    .then(tours => {
      res.status(200).json(tours)
    })
})