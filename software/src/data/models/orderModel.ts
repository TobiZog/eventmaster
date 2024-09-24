import { OrderedItemModel } from "./orderedItemModel"

export class OrderModel {
  accountId: number
  shippingProgress: number
  orderItems: Array<OrderedItemModel>
  orderedAt: string
}