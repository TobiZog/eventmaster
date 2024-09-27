import { Rating } from "../models/acts/rating.model";
import { Band } from "../models/acts/band.model";
import { Genre } from "../models/acts/genre.model";
import { Request, Response, Router } from "express";

export const genre = Router()

genre.get("/", (req: Request, res: Response) => {
  Genre.findAll({
    include: [
      {
        model: Band,
        include: [ Rating ]
      }
    ]
  })
    .then(genres => {
      res.status(200).json(genres)
    })
})