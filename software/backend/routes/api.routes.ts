import { Request, Response, NextFunction, Router } from 'express'
import { Category } from '../models/category.model'
import { OrderedItem } from '../models/orderedItem.model'
import { Order } from '../models/order.model'
import { Product } from '../models/product.model'
import { Account } from '../models/account.model'

export const api = Router()

api.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!")
})

api.get("/resetdatabase", (req: Request, res: Response, next: NextFunction) => {
  // Step 1: Delete all data tables
  Category.destroy({ truncate: true })
  OrderedItem.destroy({ truncate: true })
  Order.destroy({ truncate: true })
  Product.destroy({ truncate: true })
  Account.destroy({ truncate: true })

  // Step 2: Prepopulate with default values
  Category.bulkCreate(
    [
      { id: 0, icon: "mdi-chip", name: "Electronic" },
      { id: 1, icon: "mdi-soccer", name: "Sports" },
      { id: 2, icon: "mdi-tshirt-crew", name: "Clothes" },
      { id: 3, icon: "mdi-bookshelf", name: "Books" }
    ]
  )

  Product.bulkCreate(
    [
      { id: 0, brand: "Lenovo", name: "Thinkpad T14", price: 799.99, categoryId: 0, discount: 10, rating: 4.6, imageUrl: "https://f.media-amazon.com/images/I/51OHlMuJ5pL._AC_SL1280_.jpg" },
      { id: 1, brand: "Puma", name: "Men's Shirt", price: 14.99, categoryId: 2, discount: 0, rating: 3.8, imageUrl: "https://images.unsplash.com/photo-1496346236646-50e985b31ea4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dCUyMHNoaXJ0JTIwbWVufGVufDB8fDB8fHww" },
      { id: 2, brand: "Puma", name: "Woman's Shirt", price: 14.99, categoryId: 2, discount: 0, rating: 4.0, imageUrl: "https://images.unsplash.com/photo-1485218126466-34e6392ec754?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dCUyMHNoaXJ0JTIwd29tYW58ZW58MHx8MHx8fDA%3D" },
      { id: 3, brand: "George Orwell", name: "1984", price: 9.99, categoryId: 3, discount: 0, rating: 4.9, imageUrl: "https://f.media-amazon.com/images/I/81BExVLr8sL._SL1500_.jpg" },
      { id: 4, brand: "Johann W. Goethe", name: "Faust", price: 4.99, categoryId: 3, discount: 0, rating: 4.2, imageUrl: "https://f.media-amazon.com/images/I/71p1k4JwDqL._SL1500_.jpg" },
      { id: 5, brand: "Theodor Sturm", name: "Der Schimmelreiter", price: 4.99, categoryId: 3, discount: 0, rating: 3.5, imageUrl: "https://f.media-amazon.com/images/I/81uUWtGmKtL._SL1500_.jpg" },
      { id: 6, brand: "Aldous Huxley", name: "Brave New World", price: 7.99, categoryId: 3, discount: 0, rating: 4.4, imageUrl: "https://f.media-amazon.com/images/I/917t3Joq2WL._SL1500_.jpg" },
      { id: 7, brand: "Ankermann", name: "Gaming Work V3", price: 1299.99, categoryId: 0, discount: 0, rating: 4.7, imageUrl: "https://f.media-amazon.com/images/I/81gpDyNWhzL._AC_SL1500_.jpg" }
    ]
  )

  Account.bulkCreate(
    [
      { id: 0, username: "hagemeister93", password: "Xjt3qb5t", address: "Laportestraße 22, 30449 Hannover", firstName: "Laurin", lastName: "Hagemeister" },
      { id: 1, username: "katjaStoiber", password: "target123", address: "Gustav-Adolf-Straße 30, 30167 Hannover", firstName: "Katja", lastName: "Stoiber" },
      { id: 2, username: "oetkerohnek", password: "iloveyou", address: "Eckermannstraße 1, 30625 Hannover", firstName: "Luna", lastName: "Oeter" },
      { id: 3, username: "duranduran", password: "H4nn0ver", address: "Schlägerstraße 36, 30171 Hannover", firstName: "Jürgen", lastName: "Durand" },
      { id: 4, username: "guitarhero", password: "gwerty123", address: "Steinmetzstraße 12, 30163 Hannover", firstName: "Frederik", lastName: "Furtwängler" },
      { id: 5, username: "herbstMareike", password: "qhsrbpgrs", address: "Allerweg 33, 30851 Langenhagen", firstName: "Mareike", lastName: "Herbst" },
      { id: 6, username: "seibertmitb", password: "{jkz+WvQe", address: "Marktstraße 26, 30880 Laatzen", firstName: "Janna", lastName: "Seibert" },
    ]
  )

  Order.bulkCreate(
    [
      { id: 0, accountId: 0, totalPrice: 0 },
      { id: 1, accountId: 1, totalPrice: 0 },
      { id: 2, accountId: 1, totalPrice: 0 },
      { id: 3, accountId: 2, totalPrice: 0 },
      { id: 4, accountId: 2, totalPrice: 0 },
      { id: 5, accountId: 3, totalPrice: 0 },
      { id: 6, accountId: 3, totalPrice: 0 },
      { id: 7, accountId: 3, totalPrice: 0 },
      { id: 8, accountId: 4, totalPrice: 0 },
      { id: 9, accountId: 5, totalPrice: 0 },
      { id: 10, accountId: 6, totalPrice: 0 },
      { id: 11, accountId: 6, totalPrice: 0 },
    ]
  )

  OrderedItem.bulkCreate(
    [
      { orderId: 0, productId: 4, quantity: 2, totalPrice: 0 }
    ]
  )

  res.status(200).send()
})