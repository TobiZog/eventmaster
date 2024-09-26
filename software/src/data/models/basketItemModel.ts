import { ShowModel } from "./showModel"

export class BasketItemModel {
  id: number = -1
  quantity: number = 1
  product: ShowModel = new ShowModel()

  constructor(quantity: number, product: ShowModel) {
    this.quantity = quantity
    this.product = product
  }
}