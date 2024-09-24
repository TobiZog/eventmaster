import axios from "axios"
import { OrderModel } from "../models/orderModel"
import { BasketItemModel } from "../models/basketItemModel"
import { calcPrice } from "@/scripts/productScripts"

const BASE_URL = "http://localhost:3000/orders"

export async function getUserOrders(userId: number) {
  return axios.get(BASE_URL + "/" + userId)
}

export async function addOrder(accountId: number, basketItems: Array<BasketItemModel>) {
  let orderItems = []

  for (let basketItem of basketItems) {
    orderItems.push({
      productId: basketItem.product.id,
      quantity: basketItem.quantity,
      orderPrice: calcPrice(basketItem.product.price, basketItem.product.discount)
    })
  }

  return axios.post(BASE_URL, {
    accountId: accountId,
    orderItems: orderItems
  })
}