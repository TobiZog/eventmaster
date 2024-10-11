import axios from "axios"

const BASE_URL = "http://localhost:3000/events"

/**
 * Request all events in the database
 * 
 * @param city Filter by name of city where the concert is
 * @param genre Filter by genre of the band
 * 
 * @returns All events which fulfill the params
 */
export async function fetchEvents(city: string = "", genre: string = "") {
  let url = BASE_URL + "?"
  url += (city.length > 0) ? "city=" + city + "&" : ""
  url += (genre.length > 0) ? "genre=" + genre : ""

  return await axios.get(url)
}

/**
 * Returns events with the most concerts
 * 
 * @param nrOfEvents Limit number of returned objects
 * 
 * @returns Limited number of objects with the most concerts in it
 */
export async function getTopEvents(nrOfEvents: number) {
  let url = BASE_URL + "?sort=desc&count=" + nrOfEvents

  return await axios.get(url)
}

export async function searchEvent(searchTerm: string) {
  return await axios.get(BASE_URL + "/search?value=" + searchTerm)
}