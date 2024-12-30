/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API to manage the event locations
 */
import { Concert } from "../models/acts/concert.model";
import { City } from "../models/locations/city.model";
import { Location } from "../models/locations/location.model";
import { Request, Response, Router } from "express";
import { Band } from "../models/acts/band.model";
import { SeatGroup } from "../models/locations/seatGroup.model";
import { Seat } from "../models/locations/seat.model";
import { SeatRow } from "../models/locations/seatRow.model";
import { Op } from "sequelize";

export const location = Router()

// Response include rules
const locationStructure = [
  City,
  {
    model: Concert,
    include: [ Band ]
  },
  {
    model: SeatGroup,
    include: [
      {
        model: SeatRow,
        include: [ Seat ]
      }
    ]
  }
]

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get all available locations
 *     tags: [Locations]
 *     parameters:
 *        - in: query
 *          name: sort
 *          schema:
 *            type: string
 *          required: false
 *          description: Sort locations by number of concerts ascending (asc) or descending (desc)
 *        - in: query
 *          name: count
 *          schema:
 *            type: number
 *          required: false
 *          description: Limit number of results
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/location'
 */
location.get("/", (req: Request, res: Response) => {
  let sort = req.query.sort
  let count = req.query.count

  Location.findAll({
    include: locationStructure,
    attributes: {
      exclude: [ "cityId" ]
    }
  })
    .then(async locations => {
      // Sort ascending/descending by number of concerts
      if (sort != undefined) {
        locations.sort((location1, location2) => {
          if (sort == "desc") {
            return location2.dataValues.concerts.length - location1.dataValues.concerts.length
          } else if (sort == "asc") {
            return location1.dataValues.concerts.length - location2.dataValues.concerts.length
          }
        })
      }

      for (let location of locations) {
        location.dataValues["nrOfConcerts"] = location.dataValues.concerts.length
        delete location.dataValues.concerts
      }

      // Limit number of items
      if (count != undefined) {
        locations.splice(Number(count))
      }

      res.status(200).json(locations)
    })
})


/**
 * @swagger
 * /locations/{urlName}:
 *   get:
 *     summary: Download all available informations about a specific locations
 *     tags: [Locations]
 *     parameters:
 *        - in: path
 *          name: urlName
 *          schema:
 *            type: string
 *          required: true
 *          description: Url name of the location to request for
 *     responses:
 *       200:
 *         description: Single of location objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/location'
 *       500:
 *         description: Internal server error
 */
location.get("/location/:urlName", (req: Request, res: Response) => {
  Location.findOne({
    where: { urlName: req.params.urlName },
    include: locationStructure,
    attributes: {
      exclude: [ "cityId" ]
    }
  })
    .then(async location => {
      for (let seatGroup of location.dataValues.seatGroups) {
        for (let seatRow of seatGroup.dataValues.seatRows) {
          for (let seat of seatRow.dataValues.seats) {
            seat.dataValues["state"] = 0
          }
        }
      }

      res.status(200).json(location)
    })
    .catch(error => {
      res.status(404).send()
    })
})


/**
 * @swagger
 * /locations/search:
 *   get:
 *     summary: Search for locations
 *     tags: [Locations]
 *     parameters:
 *        - in: query
 *          name: value
 *          schema:
 *            type: string
 *          required: true
 *          description: Search term
 *     responses:
 *       200:
 *         description: List of band objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/location'
 *       500:
 *         description: Internal server error
 */
location.get("/search", (req: Request, res: Response) => {
  Location.findAll({
    where: {
      [Op.or]: [
        // Search by name of location
        {
          name: {
            [Op.substring]: req.query.value
          },
        },

        // Search by name of city
        {
          "$city.name$": {
            [Op.substring]: req.query.value
          }
        }
      ]
    },
    include: locationStructure
  })
    .then(locations => {
      res.status(200).json(locations)
    })
    .catch(error => {
      res.status(500).send()
    })
})