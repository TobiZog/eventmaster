import { RatingModel } from "@/data/models/acts/ratingModel"
import { dateToHumanReadableString } from "./dateTimeScripts"
import { TourModel } from "@/data/models/acts/tourModel"
import { EventModel } from "@/data/models/acts/eventModel"

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

export function createDateRangeString(tour: TourModel) {
  const dateArray = []

  for (let concert of tour.concerts) {
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

export function lowestTicketPrice(event: EventModel): string {
  const priceArray : Array<number> = []

  for (let concert of event.concerts) {
    priceArray.push(concert.price)
  }

  priceArray.sort()

  try {
    return priceArray[0].toFixed(2)
  } catch(e) {
    return "0"
  }
}