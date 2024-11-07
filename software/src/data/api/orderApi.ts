import axios from "axios"
import { BasketItemModel } from "../models/ordering/basketItemModel"

const BASE_URL = "http://localhost:3000/orders"

export async function fetchUserOrders(userId: number) {
  return axios.get(BASE_URL + "/" + userId)
}

export async function createOrder(
  accountId: number, 
  basketItem: Array<BasketItemModel>,
  paymentId: number,
  addressId: number
) {
  let tickets = []

  for (let item of basketItem) {
    for (let seat of item.seats) {
      tickets.push({
        concertId: item.concert.id,
        orderPrice: item.price,
        seatId: seat.id
      })
    }
  }

  return axios.post(BASE_URL, {
    accountId: accountId,
    tickets: tickets,
    paymentId: paymentId,
    addressId: addressId
  })
}

export async function fetchAllOrders() {
  return axios.get(BASE_URL)
}