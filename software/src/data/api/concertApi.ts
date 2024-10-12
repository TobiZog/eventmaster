import axios from "axios"

let BASE_URL = "http://localhost:3000/concerts"

export async function fetchConcerts() {
  return await axios.get(BASE_URL)
}

export async function getConcert(id: number) {
  if (id != undefined) {
    return await axios.get(BASE_URL + "/concert/" + id)
  } else {
    return null
  }
}

export async function searchConcert(searchTerm: string) {
  return await axios.get(BASE_URL + '/search?value=' + searchTerm)
}