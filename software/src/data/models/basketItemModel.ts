import { ProductModel } from "./productModel"

export class BasketItemModel {
  id: number = -1
  quantity: number = 1
  product: ProductModel = new ProductModel()

  constructor(quantity: number, product: ProductModel) {
    this.quantity = quantity
    this.product = product
  }
}