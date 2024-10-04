import axios from "axios"

const BASE_URL = "http://localhost:3000/events"

export async function fetchEvents(city: string = "", genre: string = "") {
  let url = BASE_URL + "?"
  url += (city.length > 0) ? "city=" + city + "&" : ""
  url += (genre.length > 0) ? "genre=" + genre : ""

  return await axios.get(url)
}

export async function getTopEvents(nrOfEvents) {
  let url = BASE_URL + "?sort=desc&count=" + nrOfEvents

  return await axios.get(url)
}