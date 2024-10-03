import { Member } from "../models/acts/member.model";
import { Band } from "../models/acts/band.model";
import { Request, Response, Router } from "express";
import { Rating } from "../models/acts/rating.model";
import { Genre } from "../models/acts/genre.model";
import { Event } from "../models/acts/event.model";
import { Concert } from "../models/acts/concert.model";
import { Location } from "../models/locations/location.model";
import { City } from "../models/locations/city.model";

export const band = Router()

// Get all bands
band.get("/", (req: Request, res: Response) => {
  Band.findAll({
    include: [ 
      {
        model: Member,
        attributes: {
          exclude: [ "id", "bandId" ]
        }
      },
      {
        model: Rating,
        attributes: {
          exclude: [ "id", "bandId" ]
        }
      },
      {
        model: Event,
        include: [
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
              exclude: [ "id", "tourId", "locationId" ]
            }
          }
        ],
        attributes: {
          exclude: [ "id", "bandId" ]
        }
      },
      Genre
    ]
  })
    .then(bands => {
      res.status(200).json(bands)
    })
})

// Get all information about one band
band.get("/:id", (req: Request, res: Response) => {
  Band.findByPk(req.params.id, {
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
      Genre
    ],
    attributes: {
      exclude: [ "genreId" ]
    }
  })
    .then(band => {
      res.status(200).json(band)
    })
})