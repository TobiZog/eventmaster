import { City } from "../models/acts/city.model";
import { Location } from "../models/acts/location.model";
import { Request, Response, Router } from "express";

export const location = Router()

location.get("/", (req: Request, res: Response) => {
  Location.findAll({
    include: [ City ],
    attributes: {
      exclude: [ "cityId" ]
    }
  })
    .then(locations => {
      res.status(200).json(locations)
    })
})