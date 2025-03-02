import { load } from "exifreader"

export async function loadLicense(url: string){
  let result = ""

  try {
    await load(url)
      .then(tags => {
        result = tags["Copyright"]["description"] + " by " + tags["Artist"]["description"]
      })
  } catch {}

  return result
}