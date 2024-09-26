import axios from "axios"

let BASE_URL = "http://localhost:3000/shows"

export async function getAllShows() {
  return await axios.get(BASE_URL)
}