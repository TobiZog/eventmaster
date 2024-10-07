import axios from "axios"

const BASE_URL = "http://localhost:3000/exercises"

export async function getAllExerciseGroups() {
  return await axios.get(BASE_URL)
}