import { Rating } from "../models/acts/rating.model";

/**
 * Calculate the average of an Array of ratings
 * 
 * @param ratings Array of ratings
 * 
 * @returns Average rating as number
 */
export function calcOverallRating(ratings: Array<Rating>): number {
  let sum = 0

  for (let rating of ratings) {
    sum += rating.dataValues.rating
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
export function calcRatingValues(ratings: Array<Rating>) {
  let ratingValues = [
    { value: 1, count: 0 },
    { value: 2, count: 0 },
    { value: 3, count: 0 },
    { value: 4, count: 0 },
    { value: 5, count: 0 }
  ]

  for (let rating of ratings) {
    ratingValues[rating.dataValues.rating - 1].count += 1
  }

  return ratingValues
}