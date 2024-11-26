import axios from "axios"
import { AccountModel } from "../models/user/accountModel"

const BASE_URL = "http://localhost:3000/accounts"

/**
 * Fetch all accounts from server
 * 
 * @param token Validation token of current logged in user. User needs to have the right privileges
 * 
 * @returns Response from server with list of all account body
 */
export async function fetchAllAccounts(token: string) {
  return await axios.get(BASE_URL, {
    headers: {
      "Authorization": token
    }
  })
}

/**
 * Start the login process
 * 
 * @param username Username of the account
 * @param password Password of the account
 * 
 * @returns Response from server with token body
 */
export async function getLogin(username: string, password: string) {
  return await axios.get(BASE_URL + "/account/login?username=" + username + "&password=" + password)
}


/**
 * Get all data about a single account
 * 
 * @param token Validation token
 * 
 * @returns Response from server with account body
 */
export async function getAccount(token: string) {
  return await axios.get(BASE_URL + "/account/data", {
    headers: {
      "Authorization": token
    }
  })
}

/**
 * Register a new account in servers database
 * 
 * @param account Account data for new dataset
 * 
 * @returns Response from server
 */
export async function registerAccount(account: AccountModel) {
  return await axios.post(BASE_URL + "/account", account)
}

/**
 * Update data of an account
 * 
 * @param account Account data to update
 * @param token Validation token
 * 
 * @returns Response from server
 */
export async function updateAccount(account: AccountModel, token: string) {
  return await axios.patch(BASE_URL + "/account", account, {
    headers: {
      "Authorization": token
    }
  })
}

/**
 * Delete an account in servers database
 * 
 * @param account Account to delete
 * 
 * @returns Response from server
 */
export async function deleteAccount(account: AccountModel) {
  return await axios.delete(BASE_URL + "/account/" + account.id)
}