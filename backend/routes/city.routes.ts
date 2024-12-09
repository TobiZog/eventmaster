/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: API to manage the cities
 */
import { City } from "../models/locations/city.model";
import { Request, Response, Router } from "express";

export const city = Router()

/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Download all cities
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: List of all cities as objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/city'
 *       500:
 *         description: Internal server error
 */
city.get("/", (req: Request, res: Response) => {
  City.findAll()
    .then(cities => {
      res.status(200).json(cities)
    })
    .catch(error => {
      res.status(500).send()
    })
})