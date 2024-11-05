import axios from "axios"

const BASE_URL = "http://localhost:3000/api"

export function fetchServerState() {
  return axios.get(BASE_URL)
}

export function resetDatabase() {
  return axios.get(BASE_URL + "/resetdatabase")
}

export function resetExerciseProgress() {
  return axios.get(BASE_URL + "/resetExerciseProgress")
}

export function fetchFileNames() {
  return axios.get(BASE_URL + "/files")
}