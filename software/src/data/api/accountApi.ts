import axios from "axios"
import { AccountModel } from "../models/accountModel"

const BASE_URL = "http://localhost:3000/accounts"

export async function login(username: string, password: string) {
  return await axios.post(BASE_URL + "/login", { 
      username: username,
      password: password
  })
}

export async function register(account: AccountModel) {
  return await axios.post(BASE_URL + "/register", account)
}