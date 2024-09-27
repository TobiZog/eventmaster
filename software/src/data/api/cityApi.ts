import axios from "axios"

const BASE_URL = "http://localhost:3000/cities"

export async function getAllCities() {
  return await axios.get(BASE_URL)
}