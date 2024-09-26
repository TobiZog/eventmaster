import { Location } from "../models/location.model";
import { Request, Response, Router } from "express";

export const location = Router()

location.get("/", (req: Request, res: Response) => {
  Location.findAll()
    .then(locations => {
      res.status(200).json(locations)
    })
})