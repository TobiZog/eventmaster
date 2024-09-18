import axios from "axios"

let BASE_URL = "http://localhost:3000/products"

/**
 * Fetch all products from API
 */
export async function getAllProducts() {
  return await axios.get(BASE_URL)
}
