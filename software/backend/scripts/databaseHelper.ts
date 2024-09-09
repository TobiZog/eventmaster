import { Category } from '../models/category.model'
import { OrderedItem } from '../models/orderedItem.model'
import { Order } from '../models/order.model'
import { Product } from '../models/product.model'
import { Account } from '../models/account.model'

import categories from "./../data/categories.json"
import products from "./../data/products.json"
import accounts from "./../data/accounts.json"
import orders from "./../data/orders.json"
import orderedItems from "./../data/orderedItems.json"

/**
 * Delete all datasets in every database table
 */
export function deleteAllTables() {
  Category.destroy({ truncate: true })
  OrderedItem.destroy({ truncate: true })
  Order.destroy({ truncate: true })
  Product.destroy({ truncate: true })
  Account.destroy({ truncate: true })
}

/**
 * Insert default datasets in the database tables
 */
export function prepopulateDatabase() {
  Category.bulkCreate(categories.data)
  Product.bulkCreate(products.data)
  Account.bulkCreate(accounts.data)
  Order.bulkCreate(orders.data)
  OrderedItem.bulkCreate(orderedItems.data)
}