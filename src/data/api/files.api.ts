import axios from "axios"

const BASE_URL = "http://localhost:3000/files"

/**
 * Fetch all public folders on server
 * 
 * @returns Response from server
 */
export function fetchFolderNames() {
  return axios.get(BASE_URL + "/folders")
}

/**
 * Fetch all static file names
 * 
 * @param dirName Name of folder where to scan files
 * 
 * @returns Response from server
 */
export function fetchFileNames(dirName: string) {
  return axios.get(BASE_URL + "/" + dirName)
}

/**
 * Upload a file to the server
 * 
 * @param file File to store on server
 * 
 * @returns Response from server
 */
export function postFile(file, folder: string) {
  let formData = new FormData()

  formData.append("file", file)
  formData.append("folder", folder)

  console.log(formData)

  return axios.post(BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}