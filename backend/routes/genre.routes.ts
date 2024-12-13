/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: API to manage the music genres
 */
import { Band } from "../models/acts/band.model";
import { Genre } from "../models/acts/genre.model";
import { Request, Response, Router } from "express";

export const genre = Router()

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Get all available genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/genre'
 *       500:
 *         description: Internal Server Error
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
 * @swagger
 * /genres:
 *   patch:
 *     summary: Update the dataset of a genre
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/genre'
 *       500:
 *         description: Internal Server Error
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
 * @swagger
 * /genres:
 *   post:
 *     summary: Add a new dataset of a genre
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/genre'
 *       500:
 *         description: Internal Server Error
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
 * @swagger
 * /genres:
 *   delete:
 *     summary: Delete the dataset of a genre
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/genre'
 *       500:
 *         description: Internal Server Error
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