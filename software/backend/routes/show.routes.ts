import { Location } from "../models/acts/location.model";
import { Show } from "../models/acts/show.model";
import { Request, Response, Router } from "express";
import { Tour } from "../models/acts/tour.model";
import { City } from "../models/acts/city.model";

export const show = Router()

show.get("/:id", (req: Request, res: Response) => {
  Show.findByPk(req.params.id, {
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