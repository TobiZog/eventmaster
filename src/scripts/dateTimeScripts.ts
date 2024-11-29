/**
 * Concert a date object to german time string
 * 
 * @param date Date object
 * 
 * @returns German date string, e.g. 31.12.2024
 */
export function dateToHumanReadableString(date: Date) {
  return String(date.getDate()).padStart(2, '0') + '.' + 
    String(date.getMonth() + 1).padStart(2, '0') + '.' + 
    date.getFullYear()
}

/**
 * Convert ISO time string to german time string
 * 
 * @param string ISO time string, e.g. 2024-12-31
 * 
 * @returns German date string, e.g. 31.12.2024
 */
export function dateStringToHumanReadableString(string: string) {
  return dateToHumanReadableString(new Date(string))
}

/**
 * Format milliseconds to a readable format
 * 
 * @param milliseconds Milliseconds to format
 * 
 * @returns h:mm format
 */
export function millisecondsToHumanReadableString(milliseconds: number): string {
  return Math.floor(milliseconds / 1000 / 60 / 60) + ':' + 
    String(Math.floor(milliseconds / 60000)).padStart(2, "0") + ''
}