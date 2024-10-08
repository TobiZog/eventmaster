import { Concert } from "../models/acts/concert.model";
import { Band } from "../models/acts/band.model";
import { Event } from "../models/acts/event.model";
import { Request, Response, Router } from "express";
import { Location } from "../models/locations/location.model";
import { Genre } from "../models/acts/genre.model";
import { City } from "../models/locations/city.model";

export const events = Router()

events.get("/", async (req: Request, res: Response) => {
  let cityName = req.query.city
  let genreName = req.query.genre
  let sort = req.query.sort
  let count = req.query.count
  let cityFilter = {}
  let genreFilter = {}

  if (cityName != undefined) {
    cityFilter = {
      model: City,
      where: { name: cityName }
    }
  } else {
    cityFilter = {
      model: City
    }
  }


  if (genreName != undefined) {
    genreFilter = {
      model: Genre,
      where: { name: genreName }
    }
  } else {
    genreFilter = {
      model: Genre
    }
  }

  Event.findAll({
    include: [
      {
        model: Concert,
        required: true,
        include: [
          {
            model: Location,
            required: true,
            include: [
              cityFilter
            ]
          }
        ],
      },
      {
        model: Band,
        required: true,
        include: [
          genreFilter
        ]
      }
    ]
  })
    .then(events => {
      if (sort != undefined) {
        events.sort((event1, event2) => {
          if (sort == "desc") {
            return event2.dataValues.concerts.length - event1.dataValues.concerts.length
          } else if (sort == "asc") {
            return event1.dataValues.concerts.length - event2.dataValues.concerts.length
          }
        })
      }

      if (count != undefined) {
        events.splice(Number(count))
      }

      res.status(200).json(events)
    })

})