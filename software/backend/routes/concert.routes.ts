import { Location } from "../models/locations/location.model";
import { Concert } from "../models/acts/concert.model";
import { Request, Response, Router } from "express";
import { Tour } from "../models/acts/tour.model";
import { City } from "../models/locations/city.model";

export const concert = Router()

concert.get("/:id", (req: Request, res: Response) => {
  Concert.findByPk(req.params.id, {
    include: [ 
      Tour,
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
  })
    .then(shows => {
      res.status(200).json(shows)
    })
})