import axios from "axios"

let BASE_URL = "http://localhost:3000/concerts"

export async function getAllConcerts() {
  return await axios.get(BASE_URL)
}