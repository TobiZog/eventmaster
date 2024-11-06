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
    .catch(error => {
      res.status(500).send()
    })
})

/**
 * Update a Genre entry
 */
genre.patch("/", (req: Request, res: Response) => {
  Genre.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).send()
    })
})

/**
 * Create a new Genre entry
 */
genre.post("/", (req: Request, res: Response) => {
  Genre.create(req.body)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).send()
    })
})

/**
 * Delete a Genre entry
 */
genre.delete("/", (req: Request, res: Response) => {
  Genre.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).send()
    })
})