import axios from "axios"

const BASE_URL = "http://localhost:3000/api"

/**
 * Fetch the current state of backend server
 * 
 * @returns Response from server
 */
export function fetchServerState() {
  return axios.get(BASE_URL)
}

/**
 * Reset the database (without exercise progress) to factory state
 * 
 * @returns Response from server
 */
export function resetDatabase() {
  return axios.get(BASE_URL + "/resetdatabase")
}

/**
 * Reset the exercise progress
 * 
 * @returns Response from server
 */
export function resetExerciseProgress() {
  return axios.get(BASE_URL + "/resetExerciseProgress")
}

/**
 * Fetch all static file names
 * 
 * @returns Response from server
 */
export function fetchFileNames() {
  return axios.get(BASE_URL + "/files")
}