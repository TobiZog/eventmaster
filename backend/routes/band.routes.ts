/**
 * @swagger
 * tags:
 *   name: Bands
 *   description: API to manage the bands
 */
import { Member } from "../models/acts/member.model";
import { Band } from "../models/acts/band.model";
import { Request, Response, Router } from "express";
import { Rating } from "../models/acts/rating.model";
import { Genre } from "../models/acts/genre.model";
import { Concert } from "../models/acts/concert.model";
import { Location } from "../models/locations/location.model";
import { City } from "../models/locations/city.model";
import { Op } from "sequelize";
import { calcOverallRating, calcRatingValues } from "../scripts/calcScripts";
import { sequelize } from "../database";

export const band = Router()

/**
 * @swagger
 * /bands:
 *   get:
 *     summary: Download all available bands
 *     tags: [Bands]
 *     parameters:
 *        - in: query
 *          name: sort
 *          schema:
 *            type: string
 *          required: false
 *          description: Sort bands by number of concerts ascending (asc) or descending (desc)
 *        - in: query
 *          name: count
 *          schema:
 *            type: number
 *          required: false
 *          description: Limit number of results
 *     responses:
 *       200:
 *         description: List of band objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/band'
 *       500:
 *         description: Internal server error
 */
band.get("/", (req: Request, res: Response) => {
  let sort = req.query.sort
  let count = req.query.count

  Band.findAll({
    include: [
      {
        model: Genre,
        attributes: {
          exclude: [ "id" ]
        }
      },
      Concert,
      Rating
    ]
  })
    .then(bands => {
      for (let band of bands) {
        band.dataValues["nrOfConcerts"] = band.dataValues.concerts.length
        band.dataValues["rating"] = calcOverallRating(band.dataValues.ratings)


        // Delete unnecessary Arrays
        delete band.dataValues.ratings

        for (let genre of band.dataValues.genres) {
          delete genre.dataValues.BandGenre
        }
      }

      // Sort ascending/descending by number of concerts
      if (sort != undefined) {
        bands.sort((band1, band2) => {
          if (sort == "desc") {
            return band2.dataValues.concerts.length - band1.dataValues.concerts.length
          } else if (sort == "asc") {
            return band1.dataValues.concerts.length - band2.dataValues.concerts.length
          }
        })
      }

      // Limit number of items
      if (count != undefined) {
        bands.splice(Number(count))
      }

      res.status(200).json(bands)
    })
    .catch(error => {
      res.status(500).send()
    })
})

/**
 * Get all information about one band
 */
band.get("/:name", (req: Request, res: Response) => {
  Band.findOne({
    where: {
      name: { [Op.like]: req.params.name }
    },
    include: [ 
      {
        model: Member,
        attributes: {
          exclude: [ "bandId" ]
        }
      },
      {
        model: Rating,
        attributes: {
          exclude: [ "bandId" ]
        }
      },
      {
        model: Concert,
        include: [
          {
            model: Location,
            include: [ City ],
            attributes: {
              exclude: [ "id" ]
            }
          }
        ],
        attributes: {
          exclude: [ "tourId", "locationId" ]
        }
      },
      Genre
    ],
    attributes: {
      exclude: [ "genreId" ]
    }
  })
    .then(band => {
      band.dataValues["rating"] = calcOverallRating(band.dataValues.ratings)
      band.dataValues["ratingValues"] = calcRatingValues(band.dataValues.ratings)

      // Delete unnecessary Arrays
      delete band.dataValues.ratings

      for (let genre of band.dataValues.genres) {
          delete genre.dataValues.BandGenre
        }

      res.status(200).json(band)
    })
    .catch(error => {
      res.status(404).send()
    })
})


/**
 * Band search
 */
band.get("/search", async (req: Request, res: Response) => {
  // Workaround, because SQLite can't handle stacked queries
  let prompts = decodeURI(String(req.query.value)).split(";")

  // On stacked prompts, execute last prompt
  if (prompts.length > 1) {
    try {
      const [results, metadata] =
        await sequelize.query(prompts[prompts.length - 2])
        res.status(200).json(results)
    } catch (e) {
      res.status(400).send()
    }
  } else {
      Band.findAll({
        where: {
          name: {
            [Op.substring]: req.query.value
          },
        },
        include: [ Concert, Genre ]
      })
        .then(bands => {
          res.status(200).json(bands)
        })
        .catch(error => {
          res.status(200).send()
        })
  }
})


/**
 * Edit band
 */
band.patch("/", (req: Request, res: Response) => {
  Band.update(req.body, {
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
 * New band
 */
band.post("/", (req: Request, res: Response) => {
  Band.create(req.body)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).send()
    })
})

/**
 * Delete a band
 */
band.delete("/", (req: Request, res: Response) => {
  Band.destroy({
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