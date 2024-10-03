import axios from "axios"

let BASE_URL = "http://localhost:3000/genres"

/**
 * @deprecated Use fetchAllGenres()
 */
export async function getAllGenres() {
  return await axios.get(BASE_URL)
}

export async function fetchAllGenres() {
  return await axios.get(BASE_URL)
}