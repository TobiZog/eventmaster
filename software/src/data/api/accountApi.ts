import axios from "axios"
import { AccountModel } from "../models/user/accountModel"

const BASE_URL = "http://localhost:3000/accounts"

export async function loginAccount(username: string, password: string) {
  return await axios.post(BASE_URL + "/login", { 
      username: username,
      password: password
  })
}

export async function registerAccount(account: AccountModel) {
  return await axios.post(BASE_URL, account)
}

export async function updateAccount(account: AccountModel) {
  return await axios.patch(BASE_URL, account)
}