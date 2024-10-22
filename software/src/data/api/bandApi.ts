import axios from "axios"

let BASE_URL = "http://localhost:3000/bands"

export async function fetchAllBands() {
  return await axios.get(BASE_URL)
}

export async function fetchBandByName(bandName: string) {
  return await axios.get(BASE_URL + '/band/' + bandName)
}

export async function fetchBandsBySearchTerm(searchTerm: string) {
  return await axios.get(BASE_URL + '/search?value=' + searchTerm)
}