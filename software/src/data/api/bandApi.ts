import axios from "axios"
import { BandDetailsApiModel } from "../models/acts/bandDetailsApiModel"
import { BandModel } from "../models/acts/bandModel"

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

export async function postBand(band: BandModel) {
  return await axios.post(BASE_URL, band)
}

export async function patchBand(band: BandModel) {
  return await axios.patch(BASE_URL, band)
}