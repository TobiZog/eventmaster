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
import { Location } from '../models/acts/location.model'
import { Concert } from '../models/acts/concert.model'
import { Tour } from '../models/acts/tour.model'
import { City } from '../models/acts/city.model'
import { BandGenre } from '../models/acts/bandGenre.model'

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
  Location.destroy({ truncate: true })
  Concert.destroy({ truncate: true })
  
  Address.destroy({ truncate: true })
  Payment.destroy({ truncate: true })
  Account.destroy({ truncate: true })
  AccountRole.destroy({ truncate: true})
}

/**
 * Insert default datasets in the database tables
 */
export async function prepopulateDatabase() {
  AccountRole.bulkCreate(accountRoles.data)
  Genre.bulkCreate(genres.data)

  for (let city of cities.data) {
    await City.create(city)
      .then(dataset => {
        Location.bulkCreate(city.locations)
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