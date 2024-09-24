/**
 * Calculate a price based on parameters
 * 
 * @param price Original price for one unit
 * @param discount Discount in percent
 * @param quantity Number of units
 * 
 * @returns Price rounded to two digits
 */
export function calcPrice(price: number, discount: number = 0, quantity: number = 1): number {
  return Math.round(quantity * price * ((100 - discount) / 100) * 100) / 100
}