import { RatingModel } from "@/data/models/acts/ratingModel"
import { dateToHumanReadableString } from "./dateTimeScripts"
import { ConcertModel } from "@/data/models/acts/concertModel"

/**
 * Calculate a price based on parameters
 * 
 * @param price Original price for one unit
 * @param discount Discount in percent
 * @param quantity Number of units
 * 
 * @returns Price rounded to two digits
 */
export function calcPrice(price: number, quantity: number = 1): number {
  return Math.round(quantity * price * 100) / 100
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


/**
 * Classifies a bunch of ratings to groups from 1 to 5 stars
 * 
 * @param ratings Array of RatingModels
 * 
 * @returns Array of Objects: { value: number[1-5], count: number }
 */
export function calcRatingValues(ratings: Array<RatingModel>) {
  let ratingValues = [
    { value: 1, count: 0 },
    { value: 2, count: 0 },
    { value: 3, count: 0 },
    { value: 4, count: 0 },
    { value: 5, count: 0 }
  ]

  for (let rating of ratings) {
    ratingValues[rating.rating - 1].count += 1
  }

  return ratingValues
}


/**
 * Create a date range string of all concerts from an Event
 * 
 * @param event EventModel with a list of concerts
 * 
 * @returns A date string. If one concert: dd.MM.YYYY, if two or more: dd.MM.YYYY - dd.MM.YYYY
 */
export function createDateRangeString(concerts: Array<ConcertModel>) {
  const dateArray: Array<Date> = []

  for (let concert of concerts) {
    dateArray.push(new Date(concert.date))
  }

  dateArray.sort(function (a, b) {
    return a.getUTCMilliseconds() - b.getUTCMilliseconds()
  })


  if (dateArray.length > 1) {
    return dateToHumanReadableString(dateArray[0]) + ' － ' + 
      dateToHumanReadableString(dateArray[dateArray.length - 1])
  } else {
    return dateToHumanReadableString(dateArray[0])
  }
}


/**
 * Search in all concerts of an Event for the show with the lowest price
 * 
 * @param event EventModel with a list of concerts
 * 
 * @returns Lowest ticket price, rounded to two floating point digits
 */
export function lowestTicketPrice(concerts: Array<ConcertModel>): string {
  const priceArray : Array<number> = []

  for (let concert of concerts) {
    priceArray.push(concert.price)
  }

  priceArray.sort()

  try {
    return priceArray[0].toFixed(2)
  } catch(e) {
    return "0"
  }
}