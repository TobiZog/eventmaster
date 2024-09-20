import { ProductModel } from "./productModel"

export class OrderedItemModel {
  orderId: number = -1
  product: ProductModel
  quantity: number = 1
  totalPrice: number = 0
}