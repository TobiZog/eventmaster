import { Location } from "../models/acts/location.model";
import { City } from "../models/acts/city.model";
import { Request, Response, Router } from "express";
import { Concert } from "../models/acts/concert.model";

export const city = Router()

city.get("/", (req: Request, res: Response) => {
  City.findAll({
    include: [ 
      {
        model: Location,
        include: [ Concert ]
      }
    ]
  })
    .then(cities => {
      for (let city of cities) {
        for (let location of city.dataValues.locations) {
          location.dataValues.nrOfConcerts = location.dataValues.concerts.length
          delete location.dataValues.concerts
        }
      }
      res.status(200).json(cities)
    })
})