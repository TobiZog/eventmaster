import { Show } from "../models/show.model";
import { Request, Response, Router } from "express";

export const show = Router()

show.get("/", (req: Request, res: Response) => {
  Show.findAll()
    .then(shows => {
      res.status(200).json(shows)
    })
})