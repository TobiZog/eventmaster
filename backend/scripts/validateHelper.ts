/**
 * Validates a string for undefined and length
 * 
 * @param string String to prove
 * @param length Minimal length of string
 * 
 * @returns True if valid
 */
export function validateString(string: string, length: number = 0) : boolean {
  if (string != undefined) {
    if (string.length >= length)
      return true
  }

  return false
}