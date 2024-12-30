/**
 * @swagger
 * tags:
 *   name: Concerts
 *   description: API to manage the concerts
 */
import { Location } from "../models/locations/location.model";
import { Concert } from "../models/acts/concert.model";
import { Request, Response, Router } from "express";
import { City } from "../models/locations/city.model";
import { SeatGroup } from "../models/locations/seatGroup.model";
import { SeatRow } from "../models/locations/seatRow.model";
import { Seat } from "../models/locations/seat.model";
import { Ticket } from "../models/ordering/ticket.model";
import { Band } from "../models/acts/band.model";
import { Op } from "sequelize";

export const concert = Router()

const concertStructure = [
  {
    model: Band
  },
  {
    model: Location,
    include: [
      {
        model: City
      },
      {
        model: SeatGroup,
        include: [
          {
            model: SeatRow,
            include: [
              {
                model: Seat,
                include: [
                  {
                    model: Ticket
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    attributes: {
      exclude: [ "cityId" ]
    }
  }
]


/**
 * @swagger
 * /concerts:
 *   get:
 *     summary: Get all available concerts
 *     tags: [Concerts]
 *     parameters:
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
 *               $ref: '#/components/schemas/concert'
 */
concert.get("/", (req: Request, res: Response) => {
  let count = req.query.count

  Concert.findAll({
    include: concertStructure,
    order: [
      [ 'date', 'ASC' ]
    ]
  })
    .then(concerts => {
      // Limit number of items
      if (count != undefined) {
        concerts.splice(Number(count))
      }

      res.status(200).json(concerts)
    })
    .catch(error => {
      res.status(500).send()
    })
})


/**
 * @swagger
 * /concerts/concert/{id}:
 *   get:
 *     summary: Download all available informations about a specific concert
 *     tags: [Concerts]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: number
 *          required: true
 *          description: ID of concert in database
 *     responses:
 *       200:
 *         description: Single concert object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/concert'
 *       404:
 *         description: Not found
 */
concert.get("/concert/:id", (req: Request, res: Response) => {
  Concert.findByPk(req.params.id, { include: concertStructure })
    .then(concert => {
      concert.dataValues["capacity"] = 0

      // Go through every seat group
      for (let seatGroup of concert.dataValues.location.dataValues.seatGroups) {
        seatGroup.dataValues["occupied"] = 0

        // Go through every seat row
        for (let seatRow of seatGroup.dataValues.seatRows) {
          for (let seat of seatRow.dataValues.seats) {
            seat.dataValues["state"] = 0
            concert.dataValues["inStock"] += 1

            // Go through every seat
            for (let ticket of seat.dataValues.tickets) {
              // Check if the seat is occupied through a ticket
              // If yes, reduce number of available seats
              if (ticket.dataValues.concertId == req.params.id) {
                seat.dataValues["state"] = 1
                seatGroup.dataValues["occupied"] += 1
                break
              }
            }

            delete seat.dataValues.tickets
          }
        }
      }

      res.status(200).json(concert)
    })
    .catch(e => {
      res.status(404).send()
    })
})


/**
 * @swagger
 * /concerts/search:
 *   get:
 *     summary: Search for concerts
 *     tags: [Concerts]
 *     parameters:
 *        - in: query
 *          name: value
 *          schema:
 *            type: string
 *          required: true
 *          description: Search term
 *     responses:
 *       200:
 *         description: List of concert objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/concert'
 *       500:
 *         description: Internal server error
 */
concert.get("/search", (req: Request, res: Response) => {
  Concert.findAll({
    where: {
      [Op.or]: [
        // Search by name of concert
        {
          name: {
            [Op.substring]: req.query.value
          }
        },

        // Search by name of band
        {
          "$band.name$": {
            [Op.substring]: req.query.value
          }
        },

        // Search by name of city of location
        {
          "$location.city.name$": {
            [Op.substring]: req.query.value
          }
        }
      ]
    },
    include: [
      Band,
      {
        model: Location,
        include: [ City ]
      }
    ]
  })
    .then(concerts => {
      res.status(200).json(concerts)
    })
    .catch(error => {
      res.status(500).send()
    })
})