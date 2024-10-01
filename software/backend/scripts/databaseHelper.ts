import { Order } from '../models/ordering/order.model'
import { OrderItem } from '../models/ordering/orderItem.model'
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
import { Tour } from '../models/acts/tour.model'
import { City } from '../models/locations/city.model'
import { BandGenre } from '../models/acts/bandGenre.model'
import { SeatGroup } from '../models/locations/seatGroup.model'
import { Seat } from '../models/locations/seat.model'
import { SeatRow } from '../models/locations/seatRow.model'

import accounts from "./../data/accounts.json"
import orders from "./../data/orders.json"
import orderItems from "./../data/orderItems.json"
import accountRoles from "./../data/accountRoles.json"
import bands from "./../data/bands.json"
import genres from "./../data/genres.json"
import tours from "./../data/tours.json"
import cities from "./../data/cities.json"


/**
 * Delete all datasets in every database table
 */
export function deleteAllTables() {
  OrderItem.destroy({truncate: true })
  Order.destroy({ truncate: true })

  Rating.destroy({ truncate: true })
  Member.destroy({ truncate: true })
  Genre.destroy({ truncate: true })
  Band.destroy({ truncate: true })
  Tour.destroy({ truncate: true })

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

/**
 * Insert default datasets in the database tables
 */
export async function prepopulateDatabase() {
  deleteAllTables()
  
  AccountRole.bulkCreate(accountRoles.data)
  Genre.bulkCreate(genres.data)

  for (let city of cities.data)
  {
    await City.create(city)
      .then(async cityDataset => {
        for (let location of city.locations) 
        {
          location["cityId"] = cityDataset.id

          await Location.create(location)
            .then(async locationDataset => {
              for (let seatGroup of location.seatGroups)
              {
                seatGroup["locationId"] = locationDataset.id
                
                await SeatGroup.create(seatGroup)
                  .then(async seatGroupRes => {
                    if (seatGroup.standingArea) {
                      // In an area without seats, create one row with all "seats"
                      await SeatRow.create({
                        row: 0,
                        seatGroupId: seatGroupRes.id
                      })
                        .then(async seatRowRes => {
                          for (let i = 0; i < seatGroup.capacity; i++) {
                            await Seat.create({
                              seatNr: i + 1,
                              seatRowId: seatRowRes.id
                            })
                          }
                        })
                    }
                    else
                    {
                      for (let row = 0; row < seatGroup.rows; row++) {
                        await SeatRow.create({
                          row: row + 1,
                          seatGroupId: seatGroupRes.id
                        })
                          .then(async seatRowRes => {
                            for (let col = 0; col < seatGroup.capacity / seatGroup.rows; col++) {
                              await Seat.create({
                                seatNr: col,
                                seatRowId: seatRowRes.id
                              })
                            }
                          })
                      }
                    }
                  })
              }
          })
        }
      })
  }


  // Account & Sub tables
  for (let account of accounts.data) {
    await Account.create(account)
      .then(dataset => {
        Address.bulkCreate(account.addresses)
        Payment.bulkCreate(account.payments)
      })
  }


  for(let band of bands.data) {
    // Create a band dataset
    await Band.create(band)
      .then(async dataset => {
        // Create the m:n associations for the genres
        for (let genreId of band.genreId) {
          await BandGenre.create({
            genreId: Number(genreId),
            bandId: dataset.dataValues.id
          })
        }

        Rating.bulkCreate(band.ratings)
        Member.bulkCreate(band.members)
      })
  }


  for (let tour of tours.data) {
    await Tour.create(tour)
      .then(async dataset => {
        for (let concert of tour.concerts) {
          await Concert.create(concert)
        }
      })
  }

  Order.bulkCreate(orders.data)
  OrderItem.bulkCreate(orderItems.data)
}