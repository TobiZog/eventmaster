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
        include: [
          {
            model: Location,
            include: [
              cityFilter
            ]
          }
        ]
      },
      {
        model: Band,
        include: [
          genreFilter
        ]
      }
    ]
  })
    .then(events => {
      let resultArray = []

      // Remove datasets which not fulfill the optional parameter
      for (let event of events) {
        if (event.dataValues.band != null) {
          for (let concert of event.dataValues.concerts) {
            if (concert.dataValues.location != null) {
              resultArray.push(event)
              break
            }
          }
        }
      }

      res.status(200).json(resultArray)
    })

})