import { AddressModel } from "../user/addressModel"
import { OrderItemModel } from "./orderItemModel"
import { PaymentModel } from "../user/paymentModel"

export class OrderModel {
  id: number
  accountId: number
  shippingProgress: number
  orderItems: Array<OrderItemModel>
  orderedAt: string
  payment: PaymentModel
  address: AddressModel
}