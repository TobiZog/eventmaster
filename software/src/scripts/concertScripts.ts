import { RatingModel } from "@/data/models/ratingModel"
import { dateToHumanReadableString } from "./dateTimeScripts"
import { TourModel } from "@/data/models/tourModel"

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

export function createDateRangeString(tour: TourModel) {
  const dateArray = []

  for (let concert of tour.shows) {
    dateArray.push(new Date(concert.date))
  }

  dateArray.sort(function (a, b) {
    return a - b
  })


  if (dateArray.length > 1) {
    return dateToHumanReadableString(dateArray[0]) + ' - ' + 
      dateToHumanReadableString(dateArray[dateArray.length - 1])
  } else {
    return dateToHumanReadableString(dateArray[0])
  }
}

export function lowestTicketPrice(tour: TourModel): string {
  const priceArray : Array<number> = []

  for (let concert of tour.shows) {
    priceArray.push(concert.price)
  }

  priceArray.sort()

  return priceArray[0].toFixed(2)
}