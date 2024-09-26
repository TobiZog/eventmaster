import { Genre } from "../models/acts/genre.model";
import { Request, Response, Router } from "express";

export const genre = Router()

genre.get("/", (req: Request, res: Response) => {
  Genre.findAll()
    .then(genres => {
      res.status(200).json(genres)
    })
})