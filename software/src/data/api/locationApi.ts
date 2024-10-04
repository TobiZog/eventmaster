import axios from "axios"

const BASE_URL = "http://localhost:3000/locations"

export async function getAllLocations() {
  return await axios.get(BASE_URL)
}

export async function getLocation(locationName: string) {
  return await axios.get(BASE_URL + "/" + locationName)
}

export async function getTopLocations(nrOfLocations: number) {
  let url = BASE_URL + "?sort=desc&count=" + nrOfLocations

  return await axios.get(url)
}