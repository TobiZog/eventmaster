import { RatingModel } from "@/data/models/ratingModel"

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

/**
 * Calculate the average of an Array of ratings
 * 
 * @param ratings Array of ratings
 * 
 * @returns Average rating as number
 */
export function calcRating(ratings: Array<RatingModel>) {
  let sum = 0

  for (let rating of ratings) {
    sum += rating.rating
  }

  return sum / ratings.length
}