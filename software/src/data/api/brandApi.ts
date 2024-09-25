import axios from "axios";

let BASE_URL = "http://localhost:3000/brands"

export async function getAllBrands() {
  return await axios.get(BASE_URL)
}
