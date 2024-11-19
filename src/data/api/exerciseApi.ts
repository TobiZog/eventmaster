import axios from "axios"

const BASE_URL = "http://localhost:3000/exercises"

export async function fetchAllExerciseGroups() {
  return await axios.get(BASE_URL)
}

export async function updateExercise(exerciseGroupNr: number, exerciseNr: number, state: boolean) {
  let url = BASE_URL + "/" + exerciseGroupNr + "/" + exerciseNr + "/" + (state ? "1" : "0")

  return await axios.post(url)
}