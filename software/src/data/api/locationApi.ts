import axios from "axios"

const BASE_URL = "http://localhost:3000/locations"

export async function fetchAllLocations() {
  return await axios.get(BASE_URL)
}

export async function getLocation(locationName: string) {
  console.log(locationName)
  return await axios.get(BASE_URL + "/location/" + locationName)
}

export async function getTopLocations(nrOfLocations: number) {
  let url = BASE_URL + "?sort=desc&count=" + nrOfLocations

  return await axios.get(url)
}

export async function searchLocation(searchTerm: string) {
  return await axios.get(BASE_URL + "/search?value=" + searchTerm)
}