import { Member } from "../models/member.model";
import { Band } from "../models/band.model";
import { Request, Response, Router } from "express";
import { Rating } from "../models/rating.model";
import { Genre } from "../models/genre.model";

export const band = Router()

band.get("/", (req: Request, res: Response) => {
  Band.findAll({
    include: [ Member, Rating, Genre ]
  })
    .then(bands => {
      res.status(200).json(bands)
    })
})