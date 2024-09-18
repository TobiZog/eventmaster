import axios from "axios"

let BASE_URL = "http://localhost:3000/categories"

export async function getAllCategories() {
  return await axios.get(BASE_URL)
}