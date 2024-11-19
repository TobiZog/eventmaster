import axios from "axios"

const BASE_URL = "http://localhost:3000/cities"

export async function fetchAllCities() {
  return await axios.get(BASE_URL)
}