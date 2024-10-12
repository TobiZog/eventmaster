import axios from "axios"

let BASE_URL = "http://localhost:3000/concerts"

export async function fetchConcerts() {
  return await axios.get(BASE_URL)
}

export async function fetchConcert(id: number) {
  if (id != undefined) {
    return await axios.get(BASE_URL + "/concert/" + id)
  } else {
    return null
  }
}

/**
 * Returns events with the most concerts
 * 
 * @param nrOfConcerts Limit number of returned objects
 * 
 * @returns Limited number of objects with the most concerts in it
 */
export async function fetchUpcomingConcerts(nrOfConcerts: number) {
  let url = BASE_URL + "?count=" + nrOfConcerts

  return await axios.get(url)
}

export async function searchConcert(searchTerm: string) {
  return await axios.get(BASE_URL + '/search?value=' + searchTerm)
}