import axios from "axios"
import { OrderModel } from "../models/orderModel"
import { BasketItemModel } from "../models/basketItemModel"

const BASE_URL = "http://localhost:3000/orders"

export async function getUserOrders(userId: number) {
  return axios.get(BASE_URL + "/" + userId)
}

export async function addOrder(accountId: number, basketItems: Array<BasketItemModel>) {
  return axios.post(BASE_URL, {
    "accountId": accountId,
    "orderItem": basketItems
  })
}