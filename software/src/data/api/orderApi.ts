import axios from "axios"

const BASE_URL = "http://localhost:3000/orders"

export async function getUserOrders(userId: number) {
  return axios.get(BASE_URL + "/" + userId)
}