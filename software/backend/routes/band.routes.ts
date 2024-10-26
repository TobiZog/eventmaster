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

export const band = Router()

// Get all bands
band.get("/", (req: Request, res: Response) => {
  let sort = req.query.sort
  let count = req.query.count

  Band.findAll({
    include: [
      {
        model: Rating,
      },
      {
        model: Genre,
        attributes: {
          exclude: [ "id" ]
        }
      },
      Concert
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
})

// Get all information about one band
band.get("/band/:name", (req: Request, res: Response) => {
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
})


// Band search
band.get("/search", (req: Request, res: Response) => {
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
})


// Edit band
band.patch("/", (req: Request, res: Response) => {
  Band.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(result => {
      res.status(200).json(result)
    })
})


// New band
band.post("/", (req: Request, res: Response) => {
  Band.create(req.body)
    .then(result => {
      res.status(200).json(result)
    })
})