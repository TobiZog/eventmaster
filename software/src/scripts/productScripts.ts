import { BasketItemModel } from "@/data/models/basketItemModel";
import { CategoryModel } from "@/data/models/categoryModel";
import { ProductModel } from "@/data/models/productModel";

export function calcProductPrice(product: ProductModel, quantity: number = 1): number {
  return calcPrice(product.price, product.discount, quantity)
}

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
 * Convert a ProductModel to a BasketModel
 * 
 * @param product ProductModel to convert
 * @param productCategory Category of the product
 * @param quantity Number of units
 * 
 * @returns BasketItemModel
 */
export function productToBasketItem(product: ProductModel, quantity: number): BasketItemModel {
  let result = new BasketItemModel()

  result.productId = product.id
  result.quantity = quantity
  result.price = product.price
  result.brand = product.brand
  result.discount = product.discount
  result.name = product.name
  result.categoryName = product.category.name
  result.categoryIcon = product.category.icon

  return result
}