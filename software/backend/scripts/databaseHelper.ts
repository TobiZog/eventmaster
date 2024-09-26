import { Order } from '../models/order.model'
import { OrderItem } from '../models/orderItem.model'
import { Account } from '../models/account.model'
import { Address } from '../models/address.model'
import { Payment } from '../models/payment.model'
import { AccountRole } from '../models/accountRole.model'
import { Rating } from '../models/rating.model'
import { Member } from '../models/member.model'
import { Genre } from '../models/genre.model'
import { Band } from '../models/band.model'
import { Location } from '../models/location.model'
import { Show } from '../models/show.model'

import accounts from "./../data/accounts.json"
import orders from "./../data/orders.json"
import orderItems from "./../data/orderItems.json"
import accountRoles from "./../data/accountRoles.json"
import bands from "./../data/bands.json"
import genres from "./../data/genres.json"
import locations from "./../data/locations.json"
import shows from "./../data/shows.json"


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
  Show.destroy({ truncate: true })
  
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
  Location.bulkCreate(locations.data)

  // Account & Sub tables
  for (let account of accounts.data) {
    await Account.create(account)
      .then(dataset => {
        Address.bulkCreate(account.addresses)
        Payment.bulkCreate(account.payments)
      })
  }


  for(let band of bands.data) {
    await Band.create(band)
      .then(dataset => {
        Rating.bulkCreate(band.ratings)
        Member.bulkCreate(band.members)
      })
  }


  Show.bulkCreate(shows.data)
  Order.bulkCreate(orders.data)
  OrderItem.bulkCreate(orderItems.data)
}