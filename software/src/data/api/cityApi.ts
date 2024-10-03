import axios from "axios"

const BASE_URL = "http://localhost:3000/cities"

/**
 * @deprecated Use fetchAllCities
 */
export async function getAllCities() {
  return await axios.get(BASE_URL)
}

export async function fetchAllCities() {
  return await axios.get(BASE_URL)
}