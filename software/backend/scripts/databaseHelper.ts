import { Category } from '../models/category.model'
import { Order } from '../models/order.model'
import { OrderItem } from '../models/orderItem.model'
import { Product } from '../models/product.model'
import { Account } from '../models/account.model'

import categories from "./../data/categories.json"
import products from "./../data/products.json"
import accounts from "./../data/accounts.json"
import orders from "./../data/orders.json"
import orderItems from "./../data/orderItems.json"

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
export function prepopulateDatabase() {
  Category.bulkCreate(categories.data)
  Product.bulkCreate(products.data)
  Account.bulkCreate(accounts.data)
  Order.bulkCreate(orders.data)
  OrderItem.bulkCreate(orderItems.data)
}