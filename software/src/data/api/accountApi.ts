import axios from "axios"
import { AccountModel } from "../models/user/accountModel"

const BASE_URL = "http://localhost:3000/accounts"

export async function fetchAllAccounts() {
  return await axios.get(BASE_URL)
}

export async function login(username: string, password: string) {
  return await axios.get(BASE_URL + "/login?username=" + username + "&password=" + password)
}

export async function getAccount(token: string) {
  return await axios.get(BASE_URL + "/account", {
    headers: {
      "Authorization": token
    }
  })
}

export async function registerAccount(account: AccountModel) {
  return await axios.post(BASE_URL, account)
}

export async function updateAccount(account: AccountModel, token: string) {
  return await axios.patch(BASE_URL, account, {
    headers: {
      "Authorization": token
    }
  })
}

export async function deleteAccount(account: AccountModel) {
  return await axios.delete(BASE_URL + "/" + account.id)
}