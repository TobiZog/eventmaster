import { City } from "../models/locations/city.model";
import { Request, Response, Router } from "express";

export const city = Router()

city.get("/", (req: Request, res: Response) => {
  City.findAll()
    .then(cities => {
      res.status(200).json(cities)
    })
})