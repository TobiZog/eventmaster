import axios from "axios"

let BASE_URL = "http://localhost:3000/locations"

export async function getAllLocations() {
  return await axios.get(BASE_URL)
}