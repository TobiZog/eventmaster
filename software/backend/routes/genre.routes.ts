import { Band } from "../models/acts/band.model";
import { Genre } from "../models/acts/genre.model";
import { Request, Response, Router } from "express";

export const genre = Router()

/**
 * Get all available Genres
 */
genre.get("/", (req: Request, res: Response) => {
  Genre.findAll({
    include: [ Band ]
  })
    .then(genres => {
      res.status(200).json(genres)
    })
})