import { ProductModel } from "./productModel"

export class BasketItemModel {
  id: number = -1
  quantity: number = 1
  product: ProductModel = new ProductModel()
}