import axios from "axios"

let BASE_URL = "http://localhost:3000/bands"

export async function getAllBands() {
  return await axios.get(BASE_URL)
}

export async function getOneBand(id: number) {
  return await axios.get(BASE_URL + '/' + id)
}