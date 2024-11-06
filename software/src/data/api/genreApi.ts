import axios from "axios"
import { GenreModel } from "../models/acts/genreModel"

let BASE_URL = "http://localhost:3000/genres"

export async function fetchAllGenres() {
  return await axios.get(BASE_URL)
}

export async function postGenre(genre: GenreModel) {
  return await axios.post(BASE_URL, genre)
}

export async function patchGenre(genre: GenreModel) {
  return await axios.patch(BASE_URL, genre)
}

export async function deleteGenre(genre: GenreModel) {
  return await axios.delete(BASE_URL, {
    data: genre
  })
}