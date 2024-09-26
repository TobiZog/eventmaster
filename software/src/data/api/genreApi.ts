import axios from "axios"

let BASE_URL = "http://localhost:3000/genres"

export async function getAllGenres() {
  return await axios.get(BASE_URL)
}