import { Order } from '../models/ordering/order.model'
import { Ticket } from '../models/ordering/ticket.model'
import { Account } from '../models/user/account.model'
import { Address } from '../models/user/address.model'
import { Payment } from '../models/user/payment.model'
import { AccountRole } from '../models/user/accountRole.model'
import { Rating } from '../models/acts/rating.model'
import { Member } from '../models/acts/member.model'
import { Genre } from '../models/acts/genre.model'
import { Band } from '../models/acts/band.model'
import { Location } from '../models/locations/location.model'
import { Concert } from '../models/acts/concert.model'
import { City } from '../models/locations/city.model'
import { BandGenre } from '../models/acts/bandGenre.model'
import { SeatGroup } from '../models/locations/seatGroup.model'
import { Seat } from '../models/locations/seat.model'
import { SeatRow } from '../models/locations/seatRow.model'
import { Exercise } from '../models/exercises/exercise.model'
import { ExerciseGroup } from '../models/exercises/exerciseGroup.model'

import accounts from "./../data/accounts.json"
import orders from "./../data/orders.json"
import accountRoles from "./../data/accountRoles.json"
import citiesLocations from "./../data/cities-locations.json"
import exercises from "./../data/exercises.json"
import bands from "./../data/bands-concerts.json"


/**
 * Delete all datasets in every database table
 */
export function deleteAllTables() {
  Ticket.destroy({truncate: true })
  Order.destroy({ truncate: true })

  Rating.destroy({ truncate: true })
  Member.destroy({ truncate: true })
  Genre.destroy({ truncate: true })
  Band.destroy({ truncate: true })

  City.destroy({ truncate: true })
  Location.destroy({ truncate: true })
  Concert.destroy({ truncate: true })
  SeatGroup.destroy({ truncate: true })
  SeatRow.destroy({ truncate: true })
  Seat.destroy({ truncate: true })
  
  Address.destroy({ truncate: true })
  Payment.destroy({ truncate: true })
  Account.destroy({ truncate: true })
  AccountRole.destroy({ truncate: true})
}

export function deleteExerciseProgressTables() {
  Exercise.destroy({truncate: true})
  ExerciseGroup.destroy({truncate: true})
}

export async function prepopulateExerciseDatabase() {
  for (let exerciseGroup of exercises.data) {
    ExerciseGroup.create(exerciseGroup)
      .then(async dataset => {
        for (let exercise of exerciseGroup.exercises) {
          exercise["exerciseGroupId"] = dataset.id

          await Exercise.create(exercise)
        }
      })
  }
}

/**
 * Insert default datasets in the database tables
 */
export async function prepopulateDatabase() {
  deleteAllTables()
  
  AccountRole.bulkCreate(accountRoles.data)
  //Genre.bulkCreate(genres.data)

  for (let city of citiesLocations.data)
  {
    await City.create(city)
      .then(async cityDataset => {
        for (let location of city.locations) 
        {
          location["cityId"] = cityDataset.id
          location["urlName"] = location.name.replaceAll(" ", "-").toLowerCase()

          await Location.create(location)
            .then(async locationDataset => {
              for (let seatGroup of location.seatGroups)
              {
                seatGroup["locationId"] = locationDataset.id
                
                // todo activate
                // await SeatGroup.create(seatGroup)
                //   .then(async seatGroupRes => {
                //     if (seatGroup.standingArea) {
                //       // In an area without seats, create one row with all "seats"
                //       await SeatRow.create({
                //         row: 0,
                //         seatGroupId: seatGroupRes.id
                //       })
                //         .then(async seatRowRes => {
                //           for (let i = 0; i < seatGroup.capacity; i++) {
                //             await Seat.create({
                //               seatNr: i + 1,
                //               seatRowId: seatRowRes.id
                //             })
                //           }
                //         })
                //     }
                //     else
                //     {
                //       for (let row = 0; row < seatGroup.rows; row++) {
                //         await SeatRow.create({
                //           row: row + 1,
                //           seatGroupId: seatGroupRes.id
                //         })
                //           .then(async seatRowRes => {
                //             for (let col = 0; col < seatGroup.capacity / seatGroup.rows; col++) {
                //               await Seat.create({
                //                 seatNr: col,
                //                 seatRowId: seatRowRes.id
                //               })
                //             }
                //           })
                //       }
                //     }
                //   })
              }
          })
        }
      })
  }


  // Account & Sub tables
  for (let account of accounts.data) {
    await Account.create(account)
      .then(async dataset => {
        for (let address of account.addresses) {
          await Address.create({
            accountId: dataset.dataValues.id,
            street: address.street,
            houseNumber: address.houseNumber,
            postalCode: address.postalCode,
            city: address.city
          })
        }

         for (let payment of account.payments) {
          await Payment.create({
            accountId: dataset.dataValues.id,
            bankName: payment.bankName,
            iban: payment.iban
          })
        }
      })
  }


  for(let band of bands.bands) {
    // Create a band dataset
    await Band.create(band)
      .then(async dataset => {
        // Create the m:n associations for the genres
        for (let genre of band.genres) {
          await Genre.findOrCreate({
            where: {
              name: genre
            },
            defaults: {
              name: genre
            }
          })
            .then(async genreDataset => {
              await BandGenre.create({
                genreId: genreDataset[0].dataValues.id,
                bandId: dataset.dataValues.id
              })
            })
        }

        for (let rating of band.ratings) {
          await Account.findOne({
            where: {
              username: rating.username
            }
          })
            .then(async account => {
              await Rating.create({
                accountId: account.dataValues.id,
                rating: rating.rating,
                bandId: dataset.dataValues.id
              })
            })
        }

        for (let member of band.members) {
          await Member.create({
            name: member.name,
            image: member.image,
            bandId: dataset.dataValues.id
          })
        }

        for (let concertGroup of band.concertGroups) {
          for (let concert of concertGroup.concerts) {
            await Location.findOne({
              where: {
                name: concert.location
              }
            })
              .then(async location => {
                await Concert.create({
                  date: concert.date,
                  name: concertGroup.name,
                  price: concert.price,
                  image: concertGroup.name,
                  inStock: concert.inStock,
                  offered: true,
                  bandId: dataset.dataValues.id,
                  locationId: location.dataValues.id
                })
              })
          }
        }
      })
  }

  // for (let order of orders.data) {
  //   await Order.create(order)
  //     .then(async dataset => {
  //       for (let ticket of order.tickets) {
  //         ticket["orderId"] = dataset.id

  //         SeatGroup.findOne({
  //           where: {
  //             name: ticket.seatGroup
  //           }
  //         })
  //           .then(seatGroup => {
  //             SeatRow.findOne({
  //               where: {
  //                 seatGroupId: seatGroup.id,
  //                 row: ticket.seatRow
  //               }
  //             })
  //               .then(seatRow => {
  //                 Seat.findOne({
  //                   where: {
  //                     seatRowId: seatRow.id,
  //                     seatNr: ticket.seat
  //                   }
  //                 })
  //                   .then(async seat => {
  //                     ticket["seatId"] = seat.id
  //                     await Ticket.create(ticket)
  //                   })
  //               })
  //           })
  //       }
  //     })
  // }
}