import { Category } from '../models/category.model'
import { Order } from '../models/order.model'
import { OrderItem } from '../models/orderItem.model'
import { Product } from '../models/product.model'
import { Account } from '../models/account.model'
import { Address } from '../models/address.model'
import { Payment } from '../models/payment.model'
import { AccountRole } from '../models/accountRole.model'
import { Brand } from '../models/brand.model'

import categories from "./../data/categories.json"
import products from "./../data/products.json"
import accounts from "./../data/accounts.json"
import orders from "./../data/orders.json"
import orderItems from "./../data/orderItems.json"
import accountRoles from "./../data/accountRoles.json"
import brands from "./../data/brands.json"

/**
 * Delete all datasets in every database table
 */
export function deleteAllTables() {
  Category.destroy({ truncate: true })
  Order.destroy({ truncate: true })
  OrderItem.destroy({truncate: true })
  Product.destroy({ truncate: true })
  Account.destroy({ truncate: true })
}

/**
 * Insert default datasets in the database tables
 */
export async function prepopulateDatabase() {
  AccountRole.bulkCreate(accountRoles.data)

  // Account & Sub tables
  for (let account of accounts.data) {
    await Account.create(account)
      .then(dataset => {
        Address.bulkCreate(account.addresses)
        Payment.bulkCreate(account.payments)
      })
  }

  Category.bulkCreate(categories.data)
  Brand.bulkCreate(brands.data)
  Product.bulkCreate(products.data)

  Order.bulkCreate(orders.data)
  OrderItem.bulkCreate(orderItems.data)
}